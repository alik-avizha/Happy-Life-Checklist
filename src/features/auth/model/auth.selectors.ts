import { AppRootType } from "app/store";

export const selectIsLoggedIn = (state: AppRootType) => state.auth.isLoggedIn;
export const selectSsInitialized = (state: AppRootType) => state.auth.isInitialized;
