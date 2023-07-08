import { useCallback, useEffect } from "react";
import { todolistThunks } from "../todolistReducer";
import { useActions } from "common/hooks/useActions";
import { useSelector } from "react-redux";
import { selectTodolists } from "features/TodolistList/todolist.selectors";
import { selectIsLoggedIn } from "features/Login/auth.selectors";

export const useTodolistList = () => {
    const todoLists = useSelector(selectTodolists);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { fetchTodolists, addTodolist: addTodolistThunk } = useActions(todolistThunks);

    useEffect(() => {
        if (!isLoggedIn) return;
        fetchTodolists();
    }, []);

    const addTodoList = useCallback((title: string) => {
        addTodolistThunk({ title });
    }, []);

    return { todoLists, addTodoList };
};
