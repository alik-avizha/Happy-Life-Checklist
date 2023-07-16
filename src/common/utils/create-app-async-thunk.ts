import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatchType, AppRootType } from "app/store";
import { ResponseType } from "common/types";

/**
 Creates an async thunk with specified types for the state, dispatch, and reject value.
 @template State - The type of the overall state object.
 @template Dispatch - The type of the dispatch function provided by the store.
 @template RejectValue - The type of the value returned by the rejected action creator.
 @returns A new async thunk function with the specified types.
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootType;
    dispatch: AppDispatchType;
    rejectValue: null | ResponseType;
}>();
