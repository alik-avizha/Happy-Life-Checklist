import { handleServerNetworkError } from "common/utils/handle-server-network-error";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appActions } from "app/app-reducer";
import { clearTasksAndTodolists } from "common/clearTaskAndTodo/clearTaskAndTodo";
import { handleServerAppError } from "common/utils/handle-server-app-error";
import { authAPI, LoginDataType } from "features/Login/auth.api";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { ResultCode } from "common/apiSettings/common.api";

const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        isInitialized: false,
    },
    reducers: {
        setIsInitialised: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isInitialized = action.payload.value;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.value;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.value;
        });
        builder.addCase(initializeApp.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.value;
        });
    },
});
// thunks
const login = createAppAsyncThunk<{ value: boolean }, LoginDataType>("auth/login", async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.login(arg);
        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
            return { value: true };
        } else {
            const isShowAppError = !res.data.fieldsErrors.length;
            handleServerAppError(res.data, dispatch, isShowAppError);
            return rejectWithValue(res.data);
        }
    });
});
const logout = createAppAsyncThunk<{ value: boolean }, void>("auth/logout", async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.logout();
        if (res.data.resultCode === ResultCode.success) {
            dispatch(clearTasksAndTodolists());
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
            return { value: false };
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    });
});

const initializeApp = createAppAsyncThunk<{ value: boolean }, void>("auth/initializeApp", async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
        const res = await authAPI.me();
        if (res.data.resultCode === ResultCode.success) {
            return { value: true };
        } else {
            return rejectWithValue(null);
        }
    } catch (err) {
        handleServerNetworkError(err, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(authActions.setIsInitialised({ value: true }));
    }
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { login, logout, initializeApp };
