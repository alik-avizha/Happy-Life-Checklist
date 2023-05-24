import {useDispatch, useSelector} from 'react-redux';
import {AppRootType} from '../../../reducers/state';
import {useCallback} from 'react';
import {addTodoListAC} from '../../../reducers/todolistReducer';
import {TodoListsType} from '../App';

export const useApp = () => {
    const todoLists = useSelector<AppRootType, TodoListsType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    },[dispatch])

    return {todoLists, addTodoList}
}