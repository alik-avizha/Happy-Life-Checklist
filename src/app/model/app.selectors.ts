import { AppRootType } from "app/store";

export const selectAppStatus = (state: AppRootType) => state.app.status;
export const selectAppError = (state: AppRootType) => state.app.error;
