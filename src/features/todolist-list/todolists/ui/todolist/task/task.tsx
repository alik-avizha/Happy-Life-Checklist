import React, { memo } from "react";
import Checkbox from "@mui/material/Checkbox";
import { EditableSpan } from "common/components/editable-span/editable-span";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTask } from "features/todolist-list/todolists/ui/todolist/task/hooks/use-task";
import { TaskDomainType } from "features/todolist-list/tasks/model/tasks.reducer";
import { TaskStatuses } from "common/enums/enums";

type TaskPropsType = {
    todoId: string;
    task: TaskDomainType;
};

export const Task = memo((props: TaskPropsType) => {
    const { deleteHandler, onChangeStatusTask, onChangeTitle } = useTask(props.todoId, props.task.id);

    return (
        <div>
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                onChange={onChangeStatusTask}
                disabled={props.task.entityStatus === "loading"}
            />
            <EditableSpan
                title={props.task.title}
                onChange={onChangeTitle}
                disabled={props.task.entityStatus === "loading"}
            />
            <IconButton onClick={deleteHandler} disabled={props.task.entityStatus === "loading"}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
});
