import {useAppDispatch, useAppSelector} from '../../../../bll/state';
import {useCallback, useEffect} from 'react';
import {createTaskTC, fetchTasksTC} from '../Task/tasksReducer';
import {changeFilterValueAC, changeTodolistTitleTC, deleteTodolistsTC, FilterType} from '../../todolistReducer';
import {TaskStatuses} from '../../../../dal/todolist-api';

export const useTodolist = (todoId: string, title: string, filter: FilterType) => {

    const tasks = useAppSelector(state => state.tasks[todoId])

    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchTasksTC(todoId))
    },[])

    let filteredTasks = tasks

    const addTaskHandler = useCallback((title: string) => {
        dispatch(createTaskTC(todoId, title))
    }, [todoId, dispatch])

    const deleteTodoListHandler = useCallback(() => {
        dispatch(deleteTodolistsTC(todoId))
    }, [dispatch, todoId])

    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleTC(todoId, title))
    }, [dispatch, todoId])

    const onClickAllHandler = useCallback(() => {
        dispatch(changeFilterValueAC(todoId, 'All'))
    }, [dispatch, todoId])
    const onClickActiveHandler = useCallback(() => {
        dispatch(changeFilterValueAC(todoId, 'Active'))
    }, [dispatch, todoId])
    const onClickCompletedHandler = useCallback(() => {
        dispatch(changeFilterValueAC(todoId, 'Completed'))
    }, [dispatch, todoId])

    if (filter === 'Active') {
        filteredTasks = tasks.filter(f => f.status === TaskStatuses.New)
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter(f => f.status === TaskStatuses.Completed)
    }
    return {
        filteredTasks,
        addTaskHandler,
        deleteTodoListHandler,
        changeTodoListTitle,
        onClickAllHandler,
        onClickActiveHandler,
        onClickCompletedHandler
    }
}