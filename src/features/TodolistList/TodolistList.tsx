import { useTodolistList } from "./hooks/useTodolistList";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { AddItemForm } from "common/components/addItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import { Todolist } from "./Todlist/Todolist";
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "features/Login/auth.selectors";

export const TodolistList = () => {
    const { todoLists, addTodoList } = useTodolistList();
    const isLoggedIn = useSelector(selectIsLoggedIn);

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
