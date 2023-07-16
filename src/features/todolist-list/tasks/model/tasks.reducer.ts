import { appActions, RequestStatusType } from "app/model/app.reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistThunks } from "features/todolist-list/todolists/model/todolist.reducer";
import { tasksAPI, TaskTypeAPI, UpdateTaskType } from "features/todolist-list/tasks/api/tasks.api";
import { TaskPriorities, TaskStatuses } from "common/enums/enums";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { thunkTryCatch } from "common/utils/thunk-try-catch";
import { ResultCode } from "common/types";

const slice = createSlice({
    name: "tasks",
    initialState: {} as TasksType,
    reducers: {
        changeEntityStatus: (
            state,
            action: PayloadAction<{ todolistId: string; taskId: string; status: RequestStatusType }>
        ) => {
            const currentTask = state[action.payload.todolistId];
            const index = currentTask.findIndex((task) => task.id === action.payload.taskId);
            if (index > -1) state[action.payload.todolistId][index].entityStatus = action.payload.status;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks.map((t) => ({ ...t, entityStatus: "idle" }));
            })
            .addCase(addTasks.fulfilled, (state, action) => {
                const currentTask = state[action.payload.task.todoListId];
                currentTask.unshift({ ...action.payload.task, entityStatus: "idle" });
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const currentTask = state[action.payload.todolistId];
                const index = currentTask.findIndex((task) => task.id === action.payload.taskId);
                if (index > -1)
                    currentTask[index] = {
                        ...currentTask[index],
                        ...action.payload.data,
                    };
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const currentTask = state[action.payload.todolistId];
                const index = currentTask.findIndex((task) => task.id === action.payload.taskId);
                if (index > -1) currentTask.splice(index, 1);
            })

            .addCase(todolistThunks.fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = [];
                });
            })
            .addCase(todolistThunks.deleteTodolists.fulfilled, (state, action) => {
                delete state[action.payload.todolistId];
            })
            .addCase(todolistThunks.addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(clearTasksAndTodolists, () => {
                return {};
            });
    },
});

//thunk creators
const fetchTasks = createAppAsyncThunk<{ todolistId: string; tasks: TaskTypeAPI[] }, string>(
    "tasks/fetchTasks",
    async (todolistId: string, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({ status: "loading" }));
            const res = await tasksAPI.getTasks(todolistId);
            const tasks = res.data.items;
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
            return { todolistId, tasks };
        } catch (err) {
            handleServerNetworkError(err, dispatch);
            return rejectWithValue(null);
        }
    }
);
const addTasks = createAppAsyncThunk<{ task: TaskTypeAPI }, { todolistId: string; title: string }>(
    "tasks/addTask",
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        return thunkTryCatch(thunkAPI, async () => {
            const res = await tasksAPI.createTask(arg.todolistId, arg.title);
            if (res.data.resultCode === ResultCode.success) {
                dispatch(appActions.setAppStatus({ status: "succeeded" }));
                return { task: res.data.data.item };
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        });
    }
);

const updateTask = createAppAsyncThunk<
    { todolistId: string; taskId: string; data: UpdateTaskModelFlex },
    { todolistId: string; taskId: string; data: UpdateTaskModelFlex }
>("tasks/updateTask", async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
        dispatch(
            tasksActions.changeEntityStatus({
                todolistId: arg.todolistId,
                taskId: arg.taskId,
                status: "loading",
            })
        );
        const task = getState().tasks[arg.todolistId].find((t) => t.id === arg.taskId);
        if (!task) {
            return rejectWithValue(null);
        }
        const model: UpdateTaskType = { ...task, ...arg.data };
        const res = await tasksAPI.updateTask(arg.todolistId, arg.taskId, model);
        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
            dispatch(
                tasksActions.changeEntityStatus({
                    todolistId: arg.todolistId,
                    taskId: arg.taskId,
                    status: "idle",
                })
            );
            return { todolistId: arg.todolistId, taskId: arg.taskId, data: arg.data };
        } else {
            handleServerAppError(res.data, dispatch);
            dispatch(
                tasksActions.changeEntityStatus({ todolistId: arg.todolistId, taskId: arg.taskId, status: "idle" })
            );
            return rejectWithValue(null);
        }
    });
});

const deleteTask = createAppAsyncThunk<{ todolistId: string; taskId: string }, { todolistId: string; taskId: string }>(
    "tasks/removeTask",
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        return thunkTryCatch(thunkAPI, async () => {
            dispatch(
                tasksActions.changeEntityStatus({ todolistId: arg.todolistId, taskId: arg.taskId, status: "loading" })
            );
            const res = await tasksAPI.deleteTask(arg.todolistId, arg.taskId);
            if (res.data.resultCode === ResultCode.success) {
                dispatch(appActions.setAppStatus({ status: "succeeded" }));
                tasksActions.changeEntityStatus({ todolistId: arg.todolistId, taskId: arg.taskId, status: "idle" });
                return arg;
            } else {
                handleServerAppError(res.data, dispatch);
                tasksActions.changeEntityStatus({ todolistId: arg.todolistId, taskId: arg.taskId, status: "idle" });
                return rejectWithValue(null);
            }
        });
    }
);

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = { fetchTasks, addTasks, updateTask, deleteTask };

//typing
export type UpdateTaskModelFlex = {
    title?: string;
    description?: string;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string;
    deadline?: string;
};
export type TaskDomainType = TaskTypeAPI & { entityStatus: RequestStatusType };
export type TasksType = {
    [key: string]: TaskDomainType[];
};
