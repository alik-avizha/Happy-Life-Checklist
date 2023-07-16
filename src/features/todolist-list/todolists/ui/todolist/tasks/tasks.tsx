import React from "react";
import { Task } from "features/todolist-list/todolists/ui/todolist/tasks/task/task";
import { useSelector } from "react-redux";
import { selectTasks } from "features/todolist-list/tasks/model/tasks.selectors";
import { TaskStatuses } from "common/enums";
import { TodolistDomainType } from "features/todolist-list/todolists/model/todolist.reducer";

type PropsType = {
    todolist: TodolistDomainType;
};
export const Tasks = (props: PropsType) => {
    const tasks = useSelector(selectTasks)[props.todolist.id];

    let filteredTasks = tasks;

    if (props.todolist.filter === "Active") {
        filteredTasks = tasks.filter((f) => f.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "Completed") {
        filteredTasks = tasks.filter((f) => f.status === TaskStatuses.Completed);
    }

    return (
        <div>
            {filteredTasks.map((t) => {
                return <Task key={t.id} todoId={props.todolist.id} task={t} />;
            })}
        </div>
    );
};
