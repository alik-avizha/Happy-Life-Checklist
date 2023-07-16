import { handleServerNetworkError } from "common/utils/handle-server-network-error";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatchType, AppRootType } from "app/store";
import { appActions } from "app/model/app.reducer";
import { ResponseType } from "common/types";

/**
 Wraps an async thunk with try-catch logic and dispatches actions to update the app status state.
 @param {BaseThunkAPI<AppRootType, any, AppDispatchType, null | ResponseType>} thunkAPI - The thunkAPI object provided by the createAsyncThunk function.
 @param {Function} logic - The async function that the thunk will wrap with try-catch logic.
 @returns The resolved value of the wrapped function, or a rejection value if an error occurs.
 */

export const thunkTryCatch = async (
    thunkAPI: BaseThunkAPI<AppRootType, any, AppDispatchType, null | ResponseType>,
    logic: Function
) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
        return await logic();
    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppStatus({ status: "idle" }));
    }
};
