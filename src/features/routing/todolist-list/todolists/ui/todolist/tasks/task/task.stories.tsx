import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Task } from "features/routing/todolist-list/todolists/ui/todolist/tasks/task/task";
import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator";
import { useSelector } from "react-redux";
import React, { ChangeEvent, useCallback } from "react";
import Checkbox from "@mui/material/Checkbox";
import { EditableSpan } from "common/components/editable-span/editable-span";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { tasksThunks } from "features/routing/todolist-list/tasks/model/tasks.slice";
import { TaskStatuses } from "common/enums/enums";
import { useActions } from "common/hooks";
import { selectTasks } from "features/routing/todolist-list/tasks/model/tasks.selectors";

const meta: Meta<typeof Task> = {
    title: "TodoLists/task",
    component: Task,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof Task>;

const TaskWithRedux = () => {
    let task = useSelector(selectTasks)["todolistId1"][0];
    const { updateTask } = useActions(tasksThunks);

    let todoId = "todolistId1";

    const onChangeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            todolistId: todoId,
            taskId: task.id,
            data: e.currentTarget.checked ? { status: TaskStatuses.Completed } : { status: TaskStatuses.New },
        });
    };

    const onChangeTitle = useCallback(
        (newValue: string) => {
            updateTask({
                todolistId: todoId,
                taskId: task.id,
                data: {
                    title: newValue,
                },
            });
        },
        [todoId, task.id]
    );

    return (
        <div>
            <Checkbox checked={task.status === TaskStatuses.Completed} onChange={onChangeStatusTask} />
            <EditableSpan title={task.title} onChange={onChangeTitle} disabled={task.entityStatus === "loading"} />
            <IconButton onClick={action("task deleted")}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
};

export const TaskStory: Story = {
    render: () => <TaskWithRedux />,
};
