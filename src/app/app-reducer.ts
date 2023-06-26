import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "app",
    initialState: {
        status: "idle" as RequestStatusType,
        error: null as null | string,
    },
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status;
        },
        setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
            state.error = action.payload.error;
        },
    },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
