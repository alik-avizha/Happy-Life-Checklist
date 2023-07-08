import { AppRootType } from "app/store";

export const selectTasks = (state: AppRootType) => state.tasks;
