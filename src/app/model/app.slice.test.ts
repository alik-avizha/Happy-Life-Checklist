import { appActions, appSlice, RequestStatusType } from "./app.slice";

type StartStateType = {
    status: RequestStatusType;
    error: null | string;
};

let initialState: StartStateType;

beforeEach(() => {
    initialState = {
        status: "idle" as RequestStatusType,
        error: null as null | string,
    };
});

it("should set app status", () => {
    const status = "loading" as RequestStatusType;

    const nextState = appSlice(initialState, appActions.setAppStatus({ status }));

    expect(nextState.status).toEqual(status);
});

it("should set app error", () => {
    const error = "Some error occurred";

    const nextState = appSlice(initialState, appActions.setAppError({ error }));

    expect(nextState.error).toEqual(error);
});

it("should handle action ending with '/pending'", () => {
    const action = { type: "someAction/pending" };

    const nextState = appSlice(initialState, action);

    expect(nextState.status).toEqual("loading");
});

it("should handle action ending with '/rejected' with payload", () => {
    const payload = {
        showGlobalError: true,
        data: {
            messages: ["Error message"],
        },
    };
    const action = { type: "someAction/rejected", payload };

    const nextState = appSlice(initialState, action);

    expect(nextState.status).toEqual("failed");
    expect(nextState.error).toEqual("Error message");
});

it("should handle action ending with '/rejected' without payload", () => {
    const action = { type: "someAction/rejected", error: { message: "Some error occurred" } };

    const nextState = appSlice(initialState, action);

    expect(nextState.status).toEqual("failed");
    expect(nextState.error).toEqual("Some error occurred");
});

it("should handle action ending with '/fulfilled'", () => {
    const action = { type: "someAction/fulfilled" };

    const nextState = appSlice(initialState, action);

    expect(nextState.status).toEqual("succeeded");
});
