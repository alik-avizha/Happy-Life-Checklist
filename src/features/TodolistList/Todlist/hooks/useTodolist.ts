import { useAppDispatch, useAppSelector } from "bll/state";
import { useCallback } from "react";
import { createTaskTC } from "../Task/tasksReducer";
import { changeTodolistTitleTC, deleteTodolistsTC, FilterType, todolistActions } from "../../todolistReducer";
import { TaskStatuses } from "dal/todolist-api";

export const useTodolist = (todoId: string, title: string, filter: FilterType) => {
    const tasks = useAppSelector((state) => state.tasks[todoId]);

    const dispatch = useAppDispatch();

    let filteredTasks = tasks;

    const addTaskHandler = useCallback(
        (title: string) => {
            dispatch(createTaskTC(todoId, title));
        },
        [todoId, dispatch]
    );

    const deleteTodoListHandler = useCallback(() => {
        dispatch(deleteTodolistsTC(todoId));
    }, [dispatch, todoId]);

    const changeTodoListTitle = useCallback(
        (title: string) => {
            dispatch(changeTodolistTitleTC(todoId, title));
        },
        [dispatch, todoId]
    );

    const onClickAllHandler = useCallback(() => {
        dispatch(todolistActions.changeTodolistFilter({ todolistId: todoId, filter: "All" }));
    }, [dispatch, todoId]);
    const onClickActiveHandler = useCallback(() => {
        dispatch(todolistActions.changeTodolistFilter({ todolistId: todoId, filter: "Active" }));
    }, [dispatch, todoId]);
    const onClickCompletedHandler = useCallback(() => {
        dispatch(todolistActions.changeTodolistFilter({ todolistId: todoId, filter: "Completed" }));
    }, [dispatch, todoId]);

    if (filter === "Active") {
        filteredTasks = tasks.filter((f) => f.status === TaskStatuses.New);
    }
    if (filter === "Completed") {
        filteredTasks = tasks.filter((f) => f.status === TaskStatuses.Completed);
    }
    return {
        filteredTasks,
        addTaskHandler,
        deleteTodoListHandler,
        changeTodoListTitle,
        onClickAllHandler,
        onClickActiveHandler,
        onClickCompletedHandler,
    };
};
