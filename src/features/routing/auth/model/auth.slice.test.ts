import { authActions, authSlice, authThunks } from "./auth.slice";

type StartStateType = {
    isLoggedIn: boolean;
    isInitialized: boolean;
    captcha: string;
};

let startState: StartStateType;

beforeEach(() => {
    startState = {
        isLoggedIn: false,
        isInitialized: false,
        captcha: "",
    };
});

test("login should set isLoggedIn to true", () => {
    const loginData = {
        email: "test@example.com",
        password: "password",
        rememberMe: true,
        captcha: "",
    };
    const endState = authSlice(startState, authThunks.login.fulfilled({ value: true }, "requestId", loginData));

    expect(endState.isLoggedIn).toBe(true);
});

test("logout should set isLoggedIn to false", () => {
    const endState = authSlice(startState, authThunks.logout.fulfilled({ value: false }, "requestId"));

    expect(endState.isLoggedIn).toBe(false);
});

test("initializeApp should set isLoggedIn to true", () => {
    const endState = authSlice(startState, authThunks.initializeApp.fulfilled({ value: true }, "requestId", {}));

    expect(endState.isLoggedIn).toBe(true);
});

test("getCaptchaUrl should set captcha", () => {
    const captchaUrl = "https://example.com/captcha.jpg";
    const endState = authSlice(startState, authThunks.getCaptchaUrl.fulfilled({ captcha: captchaUrl }, "requestId"));

    expect(endState.captcha).toBe(captchaUrl);
});

test("setIsInitialised should set isInitialized", () => {
    const endState = authSlice(startState, authActions.setIsInitialised({ value: true }));

    expect(endState.isInitialized).toBe(true);
});
