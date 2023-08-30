import React, { useCallback } from "react";
import { EditableSpan } from "common/components/editable-span/editable-span";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TodolistDomainType, todolistThunks } from "features/routing/todolist-list/todolists/model/todolist.slice";
import { useActions } from "common/hooks";
import s from "./todolist-title.module.css";

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

        <div className={s.titleWrapper}>
            <h3 className={s.title}>
                <EditableSpan
                    title={props.todoInfo.title}
                    onChange={changeTodoListTitle}
                    disabled={props.todoInfo.entityStatus === "loading"}
                />
            </h3>
            <IconButton
                onClick={deleteTodoListHandler}
                aria-label={'delete-item'}
                disabled={props.todoInfo.entityStatus === "loading"}
            >
                <DeleteIcon />
            </IconButton>
        </div>
    );
};
