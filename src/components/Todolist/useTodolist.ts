import {useDispatch, useSelector} from 'react-redux';
import {AppRootType} from '../../reducers/state';
import {FilterType, TaskType} from '../App/App';
import {useCallback} from 'react';
import {addTaskAC} from '../../reducers/tasksReducer';
import {changeFilterValueAC, changeTodoListTitleAC, deleteTodoListAC} from '../../reducers/todolistReducer';

export const useTodolist = (todoId: string, title: string, filter: FilterType) => {

    const tasks = useSelector<AppRootType, TaskType[]>(state => state.tasks[todoId])

    const dispatch = useDispatch()

    let filteredTasks = tasks

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(todoId, title))
    }, [todoId, dispatch])

    const deleteTodoListHandler = useCallback(() => {
        dispatch(deleteTodoListAC(todoId))
    }, [dispatch, todoId])

    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(changeTodoListTitleAC(todoId, title))
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
        filteredTasks = tasks.filter(f => !f.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter(f => f.isDone)
    }
    return {filteredTasks, addTaskHandler, deleteTodoListHandler, changeTodoListTitle, onClickAllHandler, onClickActiveHandler, onClickCompletedHandler}
}