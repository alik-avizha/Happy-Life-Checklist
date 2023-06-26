import { deleteTaskTC, updateTaskTC } from "../tasksReducer";
import { ChangeEvent, useCallback } from "react";
import { TaskStatuses } from "dal/todolist-api";
import { useAppDispatch } from "bll/state";

export const useTask = (todoId: string, taskId: string) => {
    const dispatch = useAppDispatch();

    const deleteHandler = () => {
        dispatch(deleteTaskTC(todoId, taskId));
    };
    const onChangeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            updateTaskTC(
                todoId,
                taskId,
                e.currentTarget.checked ? { status: TaskStatuses.Completed } : { status: TaskStatuses.New }
            )
        );
    };
    const onChangeTitle = useCallback(
        (newTitle: string) => {
            dispatch(updateTaskTC(todoId, taskId, { title: newTitle }));
        },
        [dispatch, todoId, taskId]
    );

    return { deleteHandler, onChangeStatusTask, onChangeTitle };
};
