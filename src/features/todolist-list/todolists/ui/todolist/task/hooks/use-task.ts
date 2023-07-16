import { tasksThunks } from "features/todolist-list/tasks/model/tasks.reducer";
import { ChangeEvent, useCallback } from "react";
import { TaskStatuses } from "common/enums/enums";
import { useActions } from "common/hooks/use-actions";

export const useTask = (todoId: string, taskId: string) => {
    const { deleteTask, updateTask } = useActions(tasksThunks);

    const deleteHandler = () => {
        deleteTask({ todolistId: todoId, taskId });
    };
    const onChangeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            todolistId: todoId,
            taskId,
            data: e.currentTarget.checked ? { status: TaskStatuses.Completed } : { status: TaskStatuses.New },
        });
    };
    const onChangeTitle = useCallback(
        (newTitle: string) => {
            updateTask({ todolistId: todoId, taskId, data: { title: newTitle } });
        },
        [todoId, taskId]
    );
    return { deleteHandler, onChangeStatusTask, onChangeTitle };
};
