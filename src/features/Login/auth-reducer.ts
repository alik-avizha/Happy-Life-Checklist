import { Dispatch } from "redux";
import { handleServerNetworkError } from "common/utils/handle-server-network-error";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appActions } from "app/app-reducer";
import { clearTasksAndTodolists } from "common/clearTaskAndTodo/clearTaskAndTodo";
import { handleServerAppError } from "common/utils/handle-server-app-error";
import { authAPI, LoginDataType } from "features/Login/auth.api";

const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        isInitialized: false,
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isLoggedIn = action.payload.value;
        },
        setIsInitialised: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isInitialized = action.payload.value;
        },
    },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;

// thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI
        .me()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({ value: true }));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch);
        })
        .finally(() => {
            dispatch(authActions.setIsInitialised({ value: true }));
        });
};
export const loginTC = (data: LoginDataType) => (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    authAPI
        .login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(appActions.setAppStatus({ status: "succeeded" }));
                dispatch(authActions.setIsLoggedIn({ value: true }));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch);
        });
};
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    authAPI
        .logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({ value: false }));
                dispatch(clearTasksAndTodolists());
                dispatch(appActions.setAppStatus({ status: "succeeded" }));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        });
};
