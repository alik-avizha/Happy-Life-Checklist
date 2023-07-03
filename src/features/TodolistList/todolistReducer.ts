import { todolistApi, TodolistTypeAPI } from "features/TodolistList/todolist.api";
import { AppThunk } from "app/store";
import { appActions, RequestStatusType } from "app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tasksThunks } from "features/TodolistList/Todlist/Task/tasksReducer";
import { ResultCode } from "common/apiSettings/common.api";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils";
import { clearTasksAndTodolists } from "common/clearTaskAndTodo/clearTaskAndTodo";

const slice = createSlice({
    name: "todolists",
    initialState: [] as TodolistDomainType[],
    reducers: {
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistTypeAPI }>) => {
            state.unshift({ ...action.payload.todolist, filter: "All", entityStatus: "idle" });
        },
        changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterType }>) => {
            const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
            if (index > -1) state[index].filter = action.payload.filter;
        },
        changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string; newTitle: string }>) => {
            const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
            if (index > -1) state[index].title = action.payload.newTitle;
        },
        changeTodolistEntityStatus: (
            state,
            action: PayloadAction<{ todolistId: string; status: RequestStatusType }>
        ) => {
            const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
            if (index > -1) state[index].entityStatus = action.payload.status;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map((el) => ({ ...el, filter: "All", entityStatus: "idle" }));
            })
            .addCase(deleteTodolists.fulfilled, (state, action) => {
                const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
                if (index > -1) state.splice(index, 1);
            })
            .addCase(clearTasksAndTodolists, () => {
                return [];
            });
    },
});

//thunk creators
const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistTypeAPI[] }>(
    "todolists/fetchTodolists",
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({ status: "loading" }));
            const res = await todolistApi.getTodo();
            let todos = res.data;
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
            todos.forEach((tl) => {
                dispatch(tasksThunks.fetchTasks(tl.id));
            });
            return { todolists: todos };
        } catch (err) {
            handleServerNetworkError(err, dispatch);
            return rejectWithValue(null);
        }
    }
);
const deleteTodolists = createAppAsyncThunk<{ todolistId: string }, { todolistId: string }>(
    "todolists/removeTodolist",
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({ status: "loading" }));
            dispatch(todolistActions.changeTodolistEntityStatus({ todolistId: arg.todolistId, status: "loading" }));
            const res = await todolistApi.deleteTodo(arg.todolistId);
            if (res.data.resultCode === ResultCode.success) {
                dispatch(appActions.setAppStatus({ status: "succeeded" }));
                return arg;
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

export const todolistReducer = slice.reducer;
export const todolistActions = slice.actions;
export const todolistThunks = { fetchTodolists, deleteTodolists };

export const addTodolistsTC =
    (title: string): AppThunk =>
    (dispatch) => {
        dispatch(appActions.setAppStatus({ status: "loading" }));
        todolistApi
            .createTodo(title)
            .then((res) => {
                if (res.data.resultCode === ResultCode.success) {
                    dispatch(todolistActions.addTodolist({ todolist: res.data.data.item }));
                    dispatch(appActions.setAppStatus({ status: "succeeded" }));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((err) => {
                handleServerNetworkError(err, dispatch);
            });
    };
export const changeTodolistTitleTC =
    (todolistId: string, title: string): AppThunk =>
    (dispatch) => {
        dispatch(appActions.setAppStatus({ status: "loading" }));
        dispatch(todolistActions.changeTodolistEntityStatus({ todolistId, status: "loading" }));
        todolistApi
            .updateTodo(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === ResultCode.success) {
                    dispatch(todolistActions.changeTodolistTitle({ todolistId, newTitle: title }));
                    dispatch(appActions.setAppStatus({ status: "succeeded" }));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((err) => {
                handleServerNetworkError(err, dispatch);
            })
            .finally(() => {
                dispatch(todolistActions.changeTodolistEntityStatus({ todolistId, status: "idle" }));
            });
    };

//typing
export type FilterType = "All" | "Active" | "Completed";
export type TodolistDomainType = TodolistTypeAPI & {
    filter: FilterType;
    entityStatus: RequestStatusType;
};
