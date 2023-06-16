import {useAppDispatch, useAppSelector} from '../../../bll/state';
import {useCallback, useEffect} from 'react';
import {addTodolistsTC, fetchTodolistsTC} from '../todolistReducer';

export const useTodolistList = () => {
    const todoLists = useAppSelector(state => state.todolists)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(fetchTodolistsTC())

    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistsTC(title))
    }, [dispatch])

    return {todoLists, addTodoList}
}