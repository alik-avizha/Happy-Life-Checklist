import { combineReducers } from "redux";
import { todolistReducer } from "features/TodolistList/todolistReducer";
import { tasksReducer } from "features/TodolistList/Todlist/Task/tasksReducer";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appReducer } from "app/app-reducer";
import { authReducer } from "features/Login/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

//initialization rootReducer
const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
});

//create store
export const store = configureStore({
    reducer: rootReducer,
});

//typing store
export type AppRootType = ReturnType<typeof rootReducer>;

//typing all actions
export type AllAction = any;

//typing dispatch for thunks
export type AppDispatchType = ThunkDispatch<AppRootType, any, AllAction>;

//typing thunks
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootType, unknown, AllAction>;

//custom hooks
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootType> = useSelector;

// @ts-ignore
window.store = store;
