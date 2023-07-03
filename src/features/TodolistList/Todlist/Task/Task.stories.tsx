import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Task } from "./Task";
import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator";
import { useSelector } from "react-redux";
import React, { ChangeEvent, useCallback } from "react";
import Checkbox from "@mui/material/Checkbox";
import { EditableSpan } from "common/components/editableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { AppRootType, useAppDispatch } from "app/store";
import { TaskStatuses } from "dal/todolist-api";
import { TaskDomainType, tasksThunks } from "./tasksReducer";

const meta: Meta<typeof Task> = {
    title: "TodoLists/Task",
    component: Task,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof Task>;

const TaskWithRedux = () => {
    let task = useSelector<AppRootType, TaskDomainType>((state) => state.tasks["todolistId1"][0]);

    let todoId = "todolistId1";

    const dispatch = useAppDispatch();

    const onChangeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            tasksThunks.updateTask({
                todolistId: todoId,
                taskId: task.id,
                data: e.currentTarget.checked ? { status: TaskStatuses.Completed } : { status: TaskStatuses.New },
            })
        );
    };

    const onChangeTitle = useCallback(
        (newValue: string) => {
            dispatch(
                tasksThunks.updateTask({
                    todolistId: todoId,
                    taskId: task.id,
                    data: {
                        title: newValue,
                    },
                })
            );
        },
        [dispatch, todoId, task.id]
    );

    return (
        <div>
            <Checkbox checked={task.status === TaskStatuses.Completed} onChange={onChangeStatusTask} />
            <EditableSpan title={task.title} onChange={onChangeTitle} disabled={task.entityStatus === "loading"} />
            <IconButton onClick={action("Task deleted")}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
};

export const TaskStory: Story = {
    render: () => <TaskWithRedux />,
};
