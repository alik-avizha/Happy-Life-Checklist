import { AddItemForm } from "common/components/add-item-form/add-item-form";
import { Todolist } from "features/routing/todolist-list/todolists/ui/todolist/todolist";
import React, { useCallback, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "features/routing/auth/model/auth.selectors";
import { selectTodolists } from "features/routing/todolist-list/todolists/model/todolist.selectors";
import { useActions } from "common/hooks";
import { todolistThunks } from "features/routing/todolist-list/todolists/model/todolist.slice";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import s from "./todolist-list.module.css";

export const TodolistList = () => {
    const [todoListsRef] = useAutoAnimate<HTMLDivElement>();
    const todoLists = useSelector(selectTodolists);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { fetchTodolists, addTodolist } = useActions(todolistThunks);

    useEffect(() => {
        if (!isLoggedIn) return;
        fetchTodolists({});
    }, []);

    const addTodoListCallback = useCallback((title: string) => {
        return addTodolist({ title }).unwrap();
    }, []);

    const todoListsRender = todoLists.map(el => <div key={el.id}>
        <Todolist todoInfo={el} />
    </div>);

    if (!isLoggedIn) return <Navigate to={"/login"} />;

    return (
        <>
            <div className={s.addTodolistContainer}>
                <AddItemForm addItem={addTodoListCallback} />
            </div>
            <div ref={todoListsRef} className={s.todolistList}>{todoListsRender}</div>
        </>
    );
};
