import React, { ChangeEvent, memo, useCallback } from "react";
import Checkbox from "@mui/material/Checkbox";
import { EditableSpan } from "common/components/editable-span/editable-span";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskDomainType, tasksThunks } from "features/routing/todolist-list/tasks/model/tasks.slice";
import { TaskStatuses } from "common/enums/enums";
import { useActions } from "common/hooks";
import s from "./task.module.css";

type PropsType = {
    todoId: string;
    task: TaskDomainType;
};

export const Task = memo((props: PropsType) => {
    const { deleteTask, updateTask } = useActions(tasksThunks);
    const deleteHandler = () => {
        deleteTask({ todolistId: props.todoId, taskId: props.task.id });
    };
    const onChangeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            todolistId: props.todoId,
            taskId: props.task.id,
            data: e.currentTarget.checked ? { status: TaskStatuses.Completed } : { status: TaskStatuses.New }
        });
    };

    const onChangeTitle = useCallback(
        (newTitle: string) => {
            updateTask({ todolistId: props.todoId, taskId: props.task.id, data: { title: newTitle } });
        },
        [props.todoId, props.task.id]
    );

    const isDoneStyle = props.task.status === TaskStatuses.Completed ? s.isDone : ''


    return (
        <div className={`${s.taskWrapper} ${isDoneStyle}`}>
            <Checkbox
                id={`taskCheckbox_${props.task.id}`}
                checked={props.task.status === TaskStatuses.Completed}
                onChange={onChangeStatusTask}
                disabled={props.task.entityStatus === "loading"}
            />
            <div className={s.taskTitle}>
                <EditableSpan
                    title={props.task.title}
                    onChange={onChangeTitle}
                    disabled={props.task.entityStatus === "loading"}
                />
            </div>
            <IconButton
                onClick={deleteHandler}
                aria-label={'delete-item'}
                color="primary"
                disabled={props.task.entityStatus === "loading"}
                style={{ position: "absolute", top: "2px", right: "2px", color: 'white' }}
            >
                <DeleteIcon fontSize={"small"}  />
            </IconButton>
        </div>
    );
});
