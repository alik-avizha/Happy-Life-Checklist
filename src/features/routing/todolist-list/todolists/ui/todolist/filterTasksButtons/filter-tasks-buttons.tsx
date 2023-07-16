import React from "react";
import Button from "@mui/material/Button";
import { useActions } from "common/hooks";
import {
    FilterType,
    todolistActions,
    TodolistDomainType,
} from "features/routing/todolist-list/todolists/model/todolist.slice";

type PropsType = {
    todolist: TodolistDomainType;
};
export const FilterTasksButtons = (props: PropsType) => {
    const { changeTodolistFilter } = useActions(todolistActions);

    const onClickFilterHandler = (filter: FilterType) => {
        changeTodolistFilter({ todolistId: props.todolist.id, filter });
    };

    return (
        <div style={{ paddingTop: "10px", display: "flex", justifyContent: "space-between" }}>
            <Button
                color="primary"
                variant={props.todolist.filter === "All" ? "contained" : "outlined"}
                size={"small"}
                onClick={() => onClickFilterHandler("All")}
            >
                All
            </Button>
            <Button
                color="secondary"
                variant={props.todolist.filter === "Active" ? "contained" : "outlined"}
                size={"small"}
                onClick={() => onClickFilterHandler("Active")}
            >
                Active
            </Button>
            <Button
                color="error"
                variant={props.todolist.filter === "Completed" ? "contained" : "outlined"}
                size={"small"}
                onClick={() => onClickFilterHandler("Completed")}
            >
                Completed
            </Button>
        </div>
    );
};
