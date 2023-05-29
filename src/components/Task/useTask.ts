import {useDispatch} from 'react-redux';
import {changeStatusCheckedAC, changeTaskTitleAC, deleteTaskAC} from '../../reducers/tasksReducer';
import {ChangeEvent, useCallback} from 'react';
import {TaskStatuses} from '../../api/todolist-api';

export const useTask = (todoId: string, taskId: string) => {
    const dispatch = useDispatch()

    const deleteHandler = () => {
        dispatch(deleteTaskAC(todoId, taskId))
    }
    const onChangeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatusCheckedAC(todoId, taskId, e.currentTarget.checked ? TaskStatuses.Completed: TaskStatuses.New))
    }
    const onChangeTitle = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(todoId, taskId, newValue))
    },[dispatch,todoId,taskId])

    return {deleteHandler,onChangeStatusTask, onChangeTitle}
}