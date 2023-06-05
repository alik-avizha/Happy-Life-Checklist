import {useAppDispatch, useAppSelector} from '../../bll/state';
import {useCallback, useEffect} from 'react';
import {addTodolistsTC, fetchTodolistsTC} from '../../bll/todolistReducer';

export const useApp = () => {
    const todoLists = useAppSelector(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(()=>{
       dispatch(fetchTodolistsTC())
    },[])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistsTC(title))
    },[dispatch])

    return {todoLists, addTodoList}
}