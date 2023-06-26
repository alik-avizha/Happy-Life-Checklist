import { TaskPriorities, tasksAPI, TaskStatuses, TaskTypeAPI, UpdateTaskType } from "dal/todolist-api";
import { AppRootType, AppThunk } from "bll/state";
import { appActions, RequestStatusType } from "app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "uttils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistActions } from "features/TodolistList/todolistReducer";
import { clearTasksAndTodolists } from "uttils/clearTaskAndTodo/clearTaskAndTodo";

const slice = createSlice({
    name: "tasks",
    initialState: {} as TasksType,
    reducers: {
        setTasks: (state, action: PayloadAction<{ todolistId: string; tasks: TaskTypeAPI[] }>) => {
            state[action.payload.todolistId] = action.payload.tasks.map((t) => ({ ...t, entityStatus: "idle" }));
        },
        addTask: (state, action: PayloadAction<{ task: TaskTypeAPI }>) => {
            const currentTask = state[action.payload.task.todoListId];
            currentTask.unshift({ ...action.payload.task, entityStatus: "idle" });
        },
        deleteTask: (state, action: PayloadAction<{ todolistId: string; id: string }>) => {
            const currentTask = state[action.payload.todolistId];
            const index = currentTask.findIndex((task) => task.id === action.payload.id);
            if (index > -1) currentTask.splice(index, 1);
        },
        updateTask: (state, action: PayloadAction<{ todolistId: string; id: string; data: UpdateTaskModelFlex }>) => {
            const currentTask = state[action.payload.todolistId];
            const index = currentTask.findIndex((task) => task.id === action.payload.id);
            if (index > -1)
                currentTask[index] = {
                    ...currentTask[index],
                    ...action.payload.data,
                };
        },
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

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;

//thunk creators
export const fetchTasksTC =
    (todolistId: string): AppThunk =>
    (dispatch) => {
        dispatch(appActions.setAppStatus({ status: "loading" }));
        tasksAPI
            .getTasks(todolistId)
            .then((res) => {
                dispatch(tasksActions.setTasks({ todolistId, tasks: res.data.items }));
                dispatch(appActions.setAppStatus({ status: "succeeded" }));
            })
            .catch((err) => {
                handleServerNetworkError(err, dispatch);
            });
    };
export const deleteTaskTC =
    (todolistId: string, taskId: string): AppThunk =>
    (dispatch) => {
        dispatch(appActions.setAppStatus({ status: "loading" }));
        dispatch(tasksActions.changeEntityStatus({ todolistId, taskId, status: "loading" }));
        tasksAPI
            .deleteTask(todolistId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(tasksActions.deleteTask({ todolistId, id: taskId }));
                    dispatch(appActions.setAppStatus({ status: "succeeded" }));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((err) => {
                handleServerNetworkError(err, dispatch);
            })
            .finally(() => {
                dispatch(tasksActions.changeEntityStatus({ todolistId, taskId, status: "idle" }));
            });
    };
export const createTaskTC =
    (todolistId: string, title: string): AppThunk =>
    (dispatch) => {
        dispatch(appActions.setAppStatus({ status: "loading" }));
        tasksAPI
            .createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(tasksActions.addTask({ task: res.data.data.item }));
                    dispatch(appActions.setAppStatus({ status: "succeeded" }));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((err) => {
                handleServerNetworkError(err, dispatch);
            });
    };
export const updateTaskTC =
    (todolistId: string, taskId: string, data: UpdateTaskModelFlex): AppThunk =>
    (dispatch, getState: () => AppRootType) => {
        dispatch(appActions.setAppStatus({ status: "loading" }));
        dispatch(tasksActions.changeEntityStatus({ todolistId, taskId, status: "loading" }));
        const task = getState().tasks[todolistId].find((t) => t.id === taskId);
        if (task) {
            const model: UpdateTaskType = { ...task, ...data };
            tasksAPI
                .updateTask(todolistId, taskId, model)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(tasksActions.updateTask({ todolistId, id: taskId, data }));
                        dispatch(appActions.setAppStatus({ status: "succeeded" }));
                    } else {
                        handleServerAppError(res.data, dispatch);
                    }
                })
                .catch((err) => {
                    handleServerNetworkError(err, dispatch);
                })
                .finally(() => {
                    dispatch(tasksActions.changeEntityStatus({ todolistId, taskId, status: "idle" }));
                });
        }
    };

//typing
type UpdateTaskModelFlex = {
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
