import React, { useCallback } from "react";
import { EditableSpan } from "common/components/editable-span/editable-span";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TodolistDomainType, todolistThunks } from "features/todolist-list/todolists/model/todolist.reducer";
import { useActions } from "common/hooks";

type PropsType = {
    todoInfo: TodolistDomainType;
};

export const TodolistTitle = (props: PropsType) => {
    const { deleteTodolists, changeTodolistTitle } = useActions(todolistThunks);

    const deleteTodoListHandler = () => {
        deleteTodolists({ todolistId: props.todoInfo.id });
    };

    const changeTodoListTitle = useCallback(
        (title: string) => {
            changeTodolistTitle({ todolistId: props.todoInfo.id, title });
        },
        [props.todoInfo.id]
    );

    return (
        <h3>
            <EditableSpan
                title={props.todoInfo.title}
                onChange={changeTodoListTitle}
                disabled={props.todoInfo.entityStatus === "loading"}
            />
            <IconButton onClick={deleteTodoListHandler} disabled={props.todoInfo.entityStatus === "loading"}>
                <DeleteIcon />
            </IconButton>
        </h3>
    );
};
