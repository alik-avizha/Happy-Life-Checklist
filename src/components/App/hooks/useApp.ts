import {useDispatch, useSelector} from 'react-redux';
import {AppRootType} from '../../../reducers/state';
import {useCallback} from 'react';
import {addTodoListAC, TodolistDomainType} from '../../../reducers/todolistReducer';

export const useApp = () => {
    const todoLists = useSelector<AppRootType, TodolistDomainType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    },[dispatch])

    return {todoLists, addTodoList}
}