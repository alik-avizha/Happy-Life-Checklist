import { Dispatch } from "redux";
import { appActions } from "app/model/app.slice";
import axios, { AxiosError } from "axios";

/**
 Handles network errors by dispatching actions to update the app error state.
 @param {unknown} error - The error object.
 @param {Dispatch} dispatch - The dispatch function from the Redux store.
 */

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
    const err = error as Error | AxiosError<{ error: string }>;
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : "Some error occurred";
        dispatch(appActions.setAppError({ error }));
    } else {
        dispatch(appActions.setAppError({ error: `Native error ${err.message}` }));
    }
};
