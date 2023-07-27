import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { AddItemForm } from "common/components/add-item-form/add-item-form";
import { Todolist } from "features/routing/todolist-list/todolists/ui/todolist/todolist";
import React, { useCallback, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "features/routing/auth/model/auth.selectors";
import { selectTodolists } from "features/routing/todolist-list/todolists/model/todolist.selectors";
import { useActions } from "common/hooks";
import { todolistThunks } from "features/routing/todolist-list/todolists/model/todolist.slice";

export const TodolistList = () => {
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

    if (!isLoggedIn) return <Navigate to={"/login"} />;

    return (
        <Container fixed>
            <Grid container style={{ padding: "20px" }}>
                <AddItemForm addItem={addTodoListCallback} />
            </Grid>
            <Grid container spacing={3} style={{ flexWrap: "nowrap", paddingBottom: '40px', overflowX: "scroll" }}>
                {todoLists.map((el) => {
                    return (
                        <Grid item key={el.id}>
                            <div style={{ width: "300px" }}>
                                <Todolist todoInfo={el} />
                            </div>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};
