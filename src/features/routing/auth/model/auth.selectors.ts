import { AppRootType } from "app/store";

export const selectIsLoggedIn = (state: AppRootType) => state.auth.isLoggedIn;
export const selectIsInitialized = (state: AppRootType) => state.auth.isInitialized;

export const selectIsCaptcha = (state: AppRootType) => state.auth.captcha;
