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
const login = createAppAsyncThunk<{ value: boolean }, LoginDataType>("auth/auth", async (arg, { rejectWithValue }) => {
    const res = await authAPI.login(arg);
    if (res.data.resultCode === ResultCode.success) {
        return { value: true };
    } else {
        const isShowAppError = !res.data.fieldsErrors.length;
        return rejectWithValue({ data: res.data, showGlobalError: isShowAppError });
    }
});
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
        return rejectWithValue(null);
    } finally {
        dispatch(authActions.setIsInitialised({ value: true }));
    }
});

export const authSlice = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { login, logout, initializeApp };
