import React from "react";
import Button from "@mui/material/Button";
import { useActions } from "common/hooks";
import {
    FilterType,
    todolistActions,
    TodolistDomainType,
} from "features/todolist-list/todolists/model/todolist.reducer";

type PropsType = {
    todolist: TodolistDomainType;
};
export const FilterTasksButtons = (props: PropsType) => {
    const { changeTodolistFilter } = useActions(todolistActions);

    const onClickFilterHandler = (filter: FilterType) => {
        changeTodolistFilter({ todolistId: props.todolist.id, filter });
    };

    return (
        <div>
            <Button
                color="primary"
                variant={props.todolist.filter === "All" ? "contained" : "outlined"}
                onClick={() => onClickFilterHandler("All")}
            >
                All
            </Button>
            <Button
                color="secondary"
                variant={props.todolist.filter === "Active" ? "contained" : "outlined"}
                onClick={() => onClickFilterHandler("Active")}
            >
                Active
            </Button>
            <Button
                color="error"
                variant={props.todolist.filter === "Completed" ? "contained" : "outlined"}
                onClick={() => onClickFilterHandler("Completed")}
            >
                Completed
            </Button>
        </div>
    );
};
