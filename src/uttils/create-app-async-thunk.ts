import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatchType, AppRootType } from "bll/state";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootType;
    dispatch: AppDispatchType;
    rejectValue: null;
}>();
