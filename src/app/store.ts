import { combineReducers } from "redux";
import { todolistReducer } from "features/todolist-list/todolists/model/todolist.reducer";
import { tasksReducer } from "features/todolist-list/tasks/model/tasks.reducer";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { appReducer } from "app/model/app.reducer";
import { authReducer } from "features/auth/model/auth.reducer";
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
