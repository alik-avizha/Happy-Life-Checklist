import { useCallback } from "react";
import { FilterType, todolistActions, todolistThunks } from "features/todolist-list/todolists/model/todolist.reducer";
import { tasksThunks } from "features/todolist-list/tasks/model/tasks.reducer";
import { TaskStatuses } from "common/enums/enums";
import { useActions } from "common/hooks/use-actions";
import { useSelector } from "react-redux";
import { selectTasks } from "features/todolist-list/tasks/model/tasks.selectors";

export const useTodolist = (todoId: string, title: string, filter: FilterType) => {
    const tasks = useSelector(selectTasks)[todoId];
    const { deleteTodolists, changeTodolistTitle: changeTodolistTitleThunk } = useActions(todolistThunks);
    const { addTasks } = useActions(tasksThunks);

    const { changeTodolistFilter } = useActions(todolistActions);

    let filteredTasks = tasks;

    const addTaskHandler = useCallback(
        (title: string) => {
            addTasks({ todolistId: todoId, title });
        },
        [todoId]
    );

    const deleteTodoListHandler = useCallback(() => {
        deleteTodolists({ todolistId: todoId });
    }, [todoId]);

    const changeTodoListTitle = useCallback(
        (title: string) => {
            changeTodolistTitleThunk({ todolistId: todoId, title });
        },
        [todoId]
    );

    const onClickAllHandler = useCallback(() => {
        changeTodolistFilter({ todolistId: todoId, filter: "All" });
    }, [todoId]);
    const onClickActiveHandler = useCallback(() => {
        changeTodolistFilter({ todolistId: todoId, filter: "Active" });
    }, [todoId]);
    const onClickCompletedHandler = useCallback(() => {
        changeTodolistFilter({ todolistId: todoId, filter: "Completed" });
    }, [todoId]);

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
