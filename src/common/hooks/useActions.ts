import { ActionCreator, ActionCreatorsMapObject, AsyncThunk, bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useAppDispatch } from "common/hooks/useAppDispatch";

/**
 Custom hook that returns a bound set of action creators for use in React components.
 @template Actions - The type of the action creators object.
 @returns A bound set of action creators that can be used in React components.
 * @param actions
 */
export const useActions = <Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject>(
    actions: Actions
): BoundActions<Actions> => {
    const dispatch = useAppDispatch();

    return useMemo(() => bindActionCreators(actions, dispatch), []);
};

// Types
type BoundActions<Actions extends ActionCreatorsMapObject> = {
    [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
        ? BoundAsyncThunk<Actions[key]>
        : Actions[key];
};

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
    ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>;
