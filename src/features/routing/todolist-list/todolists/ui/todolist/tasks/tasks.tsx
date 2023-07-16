import React from "react";
import { Task } from "features/routing/todolist-list/todolists/ui/todolist/tasks/task/task";
import { useSelector } from "react-redux";
import { selectTasks } from "features/routing/todolist-list/tasks/model/tasks.selectors";
import { TaskStatuses } from "common/enums";
import { TodolistDomainType } from "features/routing/todolist-list/todolists/model/todolist.slice";

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
            {filteredTasks.length === 0 && <div style={{ padding: "10px", color: "gray" }}>No tasks</div>}
        </div>
    );
};
