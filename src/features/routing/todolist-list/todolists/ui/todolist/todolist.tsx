import React, { useCallback } from "react";
import { AddItemForm } from "common/components/add-item-form/add-item-form";
import { TodolistDomainType } from "features/routing/todolist-list/todolists/model/todolist.slice";
import { TodolistTitle } from "features/routing/todolist-list/todolists/ui/todolist/todolist-title/todolist-title";
import { Tasks } from "features/routing/todolist-list/todolists/ui/todolist/tasks/tasks";
import { FilterTasksButtons } from "features/routing/todolist-list/todolists/ui/todolist/filterTasksButtons/filter-tasks-buttons";
import { useActions } from "common/hooks";
import { tasksThunks } from "features/routing/todolist-list/tasks/model/tasks.slice";
import Paper from "@mui/material/Paper";

type PropsType = {
    todoInfo: TodolistDomainType;
};

export const Todolist = (props: PropsType) => {
    const { id, entityStatus } = props.todoInfo;

    const { addTasks } = useActions(tasksThunks);

    const addTaskCallback = useCallback(
        (title: string) => {
            return addTasks({ todolistId: id, title }).unwrap();
        },
        [id]
    );

    return (
        <Paper elevation={5} sx={{ padding: '20px' }} style={{ padding: "10px"}}>
            <TodolistTitle todoInfo={props.todoInfo} />
            <AddItemForm addItem={addTaskCallback} disabled={entityStatus === "loading"} />
            <Tasks todolist={props.todoInfo} />
            <FilterTasksButtons todolist={props.todoInfo} />
        </Paper>
    );
};
