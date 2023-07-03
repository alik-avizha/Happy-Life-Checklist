import { useTodolistList } from "./hooks/useTodolistList";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { AddItemForm } from "common/components/addItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import { Todolist } from "./Todlist/Todolist";
import React from "react";
import { useAppSelector } from "app/store";
import { Navigate } from "react-router-dom";

export const TodolistList = () => {
    const { todoLists, addTodoList } = useTodolistList();

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

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
