import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatchType, AppRootType } from "app/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootType;
    dispatch: AppDispatchType;
    rejectValue: null;
}>();