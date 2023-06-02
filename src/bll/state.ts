import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TodolistActionsType, todolistReducer} from './todolistReducer';
import {TasksActionsType, tasksReducer} from './tasksReducer';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';


const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootType = ReturnType<typeof rootReducer>
export type AllAction = TasksActionsType | TodolistActionsType

export type AppDispatchType = ThunkDispatch<AppRootType, any, AllAction>

export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootType> = useSelector
