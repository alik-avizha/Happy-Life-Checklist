import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { authAPI, LoginDataType } from "features/routing/auth/api/auth.api";
import { createAppAsyncThunk } from "common/utils";
import { ResultCode } from "common/types";

const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        isInitialized: false,
        captcha: "",
    },
    reducers: {
        setIsInitialised: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isInitialized = action.payload.value;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.value;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.value;
            })
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.value;
            })
            .addCase(getCaptchaUrl.fulfilled, (state, action) => {
                state.captcha = action.payload.captcha;
            });
    },
});
// thunks
const login = createAppAsyncThunk<{ value: boolean }, LoginDataType>(
    "auth/auth",
    async (arg, { rejectWithValue, dispatch }) => {
        const res = await authAPI.login(arg);
        if (res.data.resultCode === ResultCode.success) {
            return { value: true };
        } else if (res.data.resultCode === ResultCode.captcha) {
            dispatch(getCaptchaUrl());
            return rejectWithValue(null);
        } else {
            const isShowAppError = !res.data.fieldsErrors.length;
            return rejectWithValue({ data: res.data, showGlobalError: isShowAppError });
        }
    }
);

const logout = createAppAsyncThunk<{ value: boolean }, void>(
    "auth/logout",
    async (_, { dispatch, rejectWithValue }) => {
        const res = await authAPI.logout();
        if (res.data.resultCode === ResultCode.success) {
            dispatch(clearTasksAndTodolists());
            return { value: false };
        } else {
            return rejectWithValue(null);
        }
    }
);

const initializeApp = createAppAsyncThunk<{ value: boolean }, any>("auth/initializeApp", async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
        const res = await authAPI.me();
        if (res.data.resultCode === ResultCode.success) {
            return { value: true };
        } else {
            return rejectWithValue({ data: res.data, showGlobalError: false });
        }
    } catch (err) {
        return rejectWithValue(null);
    } finally {
        dispatch(authActions.setIsInitialised({ value: true }));
    }
});

const getCaptchaUrl = createAppAsyncThunk<{ captcha: string }, void>("auth/getCaptchaUrl", async () => {
    const res = await authAPI.getCaptchaUrl();
    const captchaUrl = res.data.url;
    return { captcha: captchaUrl };
});

export const authSlice = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { login, logout, initializeApp, getCaptchaUrl };
