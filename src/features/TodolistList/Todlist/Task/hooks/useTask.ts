import { tasksThunks } from "../tasksReducer";
import { ChangeEvent, useCallback } from "react";
import { TaskStatuses } from "dal/todolist-api";
import { useAppDispatch } from "bll/state";

export const useTask = (todoId: string, taskId: string) => {
    const dispatch = useAppDispatch();

    const deleteHandler = () => {
        dispatch(tasksThunks.deleteTask({ todolistId: todoId, taskId }));
    };
    const onChangeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            tasksThunks.updateTask({
                todolistId: todoId,
                taskId,
                data: e.currentTarget.checked ? { status: TaskStatuses.Completed } : { status: TaskStatuses.New },
            })
        );
    };
    const onChangeTitle = useCallback(
        (newTitle: string) => {
            dispatch(tasksThunks.updateTask({ todolistId: todoId, taskId, data: { title: newTitle } }));
        },
        [dispatch, todoId, taskId]
    );
    return { deleteHandler, onChangeStatusTask, onChangeTitle };
};
