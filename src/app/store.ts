import { combineReducers } from "redux";
import { todolistReducer } from "features/TodolistList/todolistReducer";
import { tasksReducer } from "features/TodolistList/Todlist/Task/tasksReducer";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { appReducer } from "app/app-reducer";
import { authReducer } from "features/Login/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
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
