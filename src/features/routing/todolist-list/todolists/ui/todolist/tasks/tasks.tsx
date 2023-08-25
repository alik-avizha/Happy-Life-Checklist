import React from "react";
import { Task } from "features/routing/todolist-list/todolists/ui/todolist/tasks/task/task";
import { useSelector } from "react-redux";
import { selectTasks } from "features/routing/todolist-list/tasks/model/tasks.selectors";
import { TaskStatuses } from "common/enums";
import { TodolistDomainType } from "features/routing/todolist-list/todolists/model/todolist.slice";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import s from "./tasks.module.css";

type PropsType = {
    todolist: TodolistDomainType;
};
export const Tasks = (props: PropsType) => {
    const tasks = useSelector(selectTasks)[props.todolist.id];
    const [listRef] = useAutoAnimate<HTMLDivElement>();

    let filteredTasks = tasks;

    if (props.todolist.filter === "Active") {
        filteredTasks = tasks.filter((f) => f.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "Completed") {
        filteredTasks = tasks.filter((f) => f.status === TaskStatuses.Completed);
    }

    return (
        <div style={{ marginTop: "10px" }}>
            <div ref={listRef} className={s.taskItems}>
                {filteredTasks.map((t) => {
                    return <Task key={t.id} todoId={props.todolist.id} task={t} />;
                })}
            </div>
            {filteredTasks.length === 0 && <div style={{ padding: "10px", color: "gray" }}>No tasks</div>}
        </div>
    );
};
