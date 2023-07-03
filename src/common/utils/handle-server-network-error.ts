import { Dispatch } from "redux";
import { appActions } from "app/app-reducer";
import axios, { AxiosError } from "axios";

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
    const err = error as Error | AxiosError<{ error: string }>;
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : "Some error occurred";
        dispatch(appActions.setAppError({ error }));
    } else {
        dispatch(appActions.setAppError({ error: `Native error ${err.message}` }));
    }
    dispatch(appActions.setAppStatus({ status: "failed" }));
};
