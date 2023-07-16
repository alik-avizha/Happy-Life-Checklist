import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatusType } from "app/model/app.reducer";
import { clearTasksAndTodolists } from "common/actions";
import { createAppAsyncThunk } from "common/utils";
import { todolistApi, TodolistTypeAPI } from "features/todolist-list/todolists/api/todolist.api";
import { tasksThunks } from "features/todolist-list/tasks/model/tasks.reducer";
import { ResultCode } from "common/types";

const slice = createSlice({
    name: "todolists",
    initialState: [] as TodolistDomainType[],
    reducers: {
        changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterType }>) => {
            const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
            if (index > -1) state[index].filter = action.payload.filter;
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
            .addCase(addTodolist.fulfilled, (state, action) => {
                state.unshift({ ...action.payload.todolist, filter: "All", entityStatus: "idle" });
            })
            .addCase(changeTodolistTitle.fulfilled, (state, action) => {
                const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
                if (index > -1) state[index].title = action.payload.title;
            })
            .addCase(clearTasksAndTodolists, () => {
                return [];
            });
    },
});

//thunk creators
const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistTypeAPI[] }>(
    "todolists/fetchTodolists",
    async (arg, { dispatch }) => {
        const res = await todolistApi.getTodo();
        let todos = res.data;
        todos.forEach((tl) => {
            dispatch(tasksThunks.fetchTasks(tl.id));
        });
        return { todolists: todos };
    }
);
const deleteTodolists = createAppAsyncThunk<{ todolistId: string }, { todolistId: string }>(
    "todolists/removeTodolist",
    async (arg, { dispatch, rejectWithValue }) => {
        dispatch(todolistActions.changeTodolistEntityStatus({ todolistId: arg.todolistId, status: "loading" }));
        const res = await todolistApi.deleteTodo(arg.todolistId);
        if (res.data.resultCode === ResultCode.success) {
            return arg;
        } else {
            return rejectWithValue({ data: res.data, showGlobalError: true });
        }
    }
);
const addTodolist = createAppAsyncThunk<{ todolist: TodolistTypeAPI }, { title: string }>(
    "todolists/addTodolist",
    async (arg, { rejectWithValue }) => {
        const res = await todolistApi.createTodo(arg.title);
        if (res.data.resultCode === ResultCode.success) {
            return { todolist: res.data.data.item };
        } else {
            return rejectWithValue({ data: res.data, showGlobalError: false });
        }
    }
);
const changeTodolistTitle = createAppAsyncThunk<
    { todolistId: string; title: string },
    { todolistId: string; title: string }
>("todolists/changeTodolistTitle", async (arg, { dispatch, rejectWithValue }) => {
    dispatch(todolistActions.changeTodolistEntityStatus({ todolistId: arg.todolistId, status: "loading" }));
    const res = await todolistApi.updateTodo(arg.todolistId, arg.title);
    if (res.data.resultCode === ResultCode.success) {
        dispatch(todolistActions.changeTodolistEntityStatus({ todolistId: arg.todolistId, status: "idle" }));
        return { todolistId: arg.todolistId, title: arg.title };
    } else {
        dispatch(todolistActions.changeTodolistEntityStatus({ todolistId: arg.todolistId, status: "idle" }));
        return rejectWithValue({ data: res.data, showGlobalError: true });
    }
});

export const todolistReducer = slice.reducer;
export const todolistActions = slice.actions;
export const todolistThunks = { fetchTodolists, deleteTodolists, addTodolist, changeTodolistTitle };

//typing
export type FilterType = "All" | "Active" | "Completed";
export type TodolistDomainType = TodolistTypeAPI & {
    filter: FilterType;
    entityStatus: RequestStatusType;
};
