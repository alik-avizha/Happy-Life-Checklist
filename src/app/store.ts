import { combineReducers } from "redux";
import { todolistSlice } from "features/routing/todolist-list/todolists/model/todolist.slice";
import { tasksSlice } from "features/routing/todolist-list/tasks/model/tasks.slice";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { appSlice } from "app/model/app.slice";
import { authSlice } from "features/routing/auth/model/auth.slice";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todolists: todolistSlice,
    tasks: tasksSlice,
    app: appSlice,
    auth: authSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type AppRootType = ReturnType<typeof rootReducer>;

export type AllAction = any;

export type AppDispatchType = ThunkDispatch<AppRootType, any, AllAction>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootType, unknown, AllAction>;

// @ts-ignore
window.store = store;
