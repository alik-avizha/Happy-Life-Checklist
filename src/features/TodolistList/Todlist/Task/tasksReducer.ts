import { TaskPriorities, tasksAPI, TaskStatuses, TaskTypeAPI, UpdateTaskType } from "dal/todolist-api";
import { appActions, RequestStatusType } from "app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "uttils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistActions } from "features/TodolistList/todolistReducer";
import { clearTasksAndTodolists } from "uttils/clearTaskAndTodo/clearTaskAndTodo";
import { createAppAsyncThunk } from "uttils/create-app-async-thunk";

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

            .addCase(todolistActions.setTodolists, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = [];
                });
            })
            .addCase(todolistActions.deleteTodolists, (state, action) => {
                delete state[action.payload.todolistId];
            })
            .addCase(todolistActions.addTodolist, (state, action) => {
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
        try {
            dispatch(appActions.setAppStatus({ status: "loading" }));
            const res = await tasksAPI.createTask(arg.todolistId, arg.title);
            if (res.data.resultCode === 0) {
                dispatch(appActions.setAppStatus({ status: "succeeded" }));
                return { task: res.data.data.item };
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        } catch (err) {
            handleServerNetworkError(err, dispatch);
            return rejectWithValue(null);
        }
    }
);
const updateTask = createAppAsyncThunk<
    { todolistId: string; taskId: string; data: UpdateTaskModelFlex },
    { todolistId: string; taskId: string; data: UpdateTaskModelFlex }
>("tasks/updateTask", async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;
    try {
        dispatch(appActions.setAppStatus({ status: "loading" }));
        dispatch(
            tasksActions.changeEntityStatus({ todolistId: arg.todolistId, taskId: arg.taskId, status: "loading" })
        );
        const task = getState().tasks[arg.todolistId].find((t) => t.id === arg.taskId);
        if (!task) {
            return rejectWithValue(null);
        }
        const model: UpdateTaskType = { ...task, ...arg.data };
        const res = await tasksAPI.updateTask(arg.todolistId, arg.taskId, model);
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
            return { todolistId: arg.todolistId, taskId: arg.taskId, data: arg.data };
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    } catch (err) {
        handleServerNetworkError(err, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(tasksActions.changeEntityStatus({ todolistId: arg.todolistId, taskId: arg.taskId, status: "idle" }));
    }
});

const deleteTask = createAppAsyncThunk<{ todolistId: string; taskId: string }, { todolistId: string; taskId: string }>(
    "tasks/removeTask",
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({ status: "loading" }));
            dispatch(
                tasksActions.changeEntityStatus({ todolistId: arg.todolistId, taskId: arg.taskId, status: "loading" })
            );
            const res = await tasksAPI.deleteTask(arg.todolistId, arg.taskId);
            if (res.data.resultCode === 0) {
                dispatch(appActions.setAppStatus({ status: "succeeded" }));
                return arg;
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        } catch (err) {
            handleServerNetworkError(err, dispatch);
            return rejectWithValue(null);
        } finally {
            dispatch(
                tasksActions.changeEntityStatus({ todolistId: arg.todolistId, taskId: arg.taskId, status: "idle" })
            );
        }
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
