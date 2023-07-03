import { Dispatch } from "redux";
import { ResponseType } from "dal/todolist-api";
import { appActions } from "app/app-reducer";
import axios, { AxiosError } from "axios";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(appActions.setAppError({ error: data.messages[0] }));
    } else {
        dispatch(appActions.setAppError({ error: "Some error occurred" }));
    }
    dispatch(appActions.setAppStatus({ status: "failed" }));
};

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
