import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => {
                    return action.type.endsWith("/pending");
                },
                (state) => {
                    state.status = "loading";
                }
            )
            .addMatcher(
                (action: AnyAction) => {
                    return action.type.endsWith("/rejected");
                },
                (state, action) => {
                    state.status = "failed";

                    const { payload, error } = action;
                    if (payload) {
                        if (payload.showGlobalError) {
                            state.error = payload.data.messages.length
                                ? payload.data.messages[0]
                                : "Some error occurred";
                        }
                    } else {
                        state.error = error.message ? error.message : "Some error occurred";
                    }
                }
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith("/fulfilled");
                },
                (state) => {
                    state.status = "succeeded";
                }
            );
    },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
