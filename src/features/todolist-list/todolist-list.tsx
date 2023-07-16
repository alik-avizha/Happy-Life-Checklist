import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { AddItemForm } from "common/components/add-item-form/add-item-form";
import Paper from "@mui/material/Paper";
import { Todolist } from "features/todolist-list/todolists/ui/todolist/todolist";
import React, { useCallback, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { selectTodolists } from "features/todolist-list/todolists/model/todolist.selectors";
import { useActions } from "common/hooks";
import { todolistThunks } from "features/todolist-list/todolists/model/todolist.reducer";

export const TodolistList = () => {
    const todoLists = useSelector(selectTodolists);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { fetchTodolists, addTodolist: addTodolistThunk } = useActions(todolistThunks);

    useEffect(() => {
        if (!isLoggedIn) return;
        fetchTodolists({});
    }, []);

    const addTodoList = useCallback((title: string) => {
        addTodolistThunk({ title });
    }, []);

    if (!isLoggedIn) return <Navigate to={"/login"} />;

    return (
        <Container fixed>
            <Grid container style={{ padding: "20px" }}>
                <AddItemForm addItem={addTodoList} />
            </Grid>
            <Grid container spacing={3}>
                {todoLists.map((el) => {
                    return (
                        <Grid item key={el.id}>
                            <Paper style={{ padding: "10px" }}>
                                <Todolist todoInfo={el} />
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};
