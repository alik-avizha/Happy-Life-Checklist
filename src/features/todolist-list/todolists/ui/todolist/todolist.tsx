import React from "react";
import { AddItemForm } from "common/components/add-item-form/add-item-form";
import { EditableSpan } from "common/components/editable-span/editable-span";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Task } from "features/todolist-list/todolists/ui/todolist/task/task";
import { useTodolist } from "features/todolist-list/todolists/ui/todolist/hooks/use-todolist";
import { TodolistDomainType } from "features/todolist-list/todolists/model/todolist.reducer";

type TodolistPropsType = {
    todoInfo: TodolistDomainType;
};

export const Todolist = (props: TodolistPropsType) => {
    const { id, title, filter, entityStatus } = props.todoInfo;
    const {
        filteredTasks,
        addTaskHandler,
        deleteTodoListHandler,
        changeTodoListTitle,
        onClickAllHandler,
        onClickActiveHandler,
        onClickCompletedHandler,
    } = useTodolist(id, title, filter);

    const mappingTasks = filteredTasks.map((t) => {
        return <Task key={t.id} todoId={id} task={t} />;
    });
    return (
        <div>
            <h3>
                <EditableSpan title={title} onChange={changeTodoListTitle} disabled={entityStatus === "loading"} />
                <IconButton onClick={deleteTodoListHandler} disabled={entityStatus === "loading"}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler} disabled={entityStatus === "loading"} />
            <div>{mappingTasks}</div>
            <div>
                <div>
                    <Button
                        color="primary"
                        variant={filter === "All" ? "contained" : "outlined"}
                        onClick={onClickAllHandler}
                    >
                        All
                    </Button>
                    <Button
                        color="secondary"
                        variant={filter === "Active" ? "contained" : "outlined"}
                        onClick={onClickActiveHandler}
                    >
                        Active
                    </Button>
                    <Button
                        color="error"
                        variant={filter === "Completed" ? "contained" : "outlined"}
                        onClick={onClickCompletedHandler}
                    >
                        Completed
                    </Button>
                </div>
            </div>
        </div>
    );
};
