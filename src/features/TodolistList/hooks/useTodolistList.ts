import { useAppDispatch, useAppSelector } from "app/store";
import { useCallback, useEffect } from "react";
import { todolistThunks } from "../todolistReducer";

export const useTodolistList = () => {
    const todoLists = useAppSelector((state) => state.todolists);
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isLoggedIn) return;
        dispatch(todolistThunks.fetchTodolists());
    }, []);

    const addTodoList = useCallback(
        (title: string) => {
            dispatch(todolistThunks.addTodolist({ title }));
        },
        [dispatch]
    );

    return { todoLists, addTodoList };
};
