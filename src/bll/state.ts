import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TodolistActionsType, todolistReducer} from './todolistReducer';
import {TasksActionsType, tasksReducer} from './tasksReducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

//initialization rootReducer
const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

//create store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

//typing store
export type AppRootType = ReturnType<typeof rootReducer>

//typing all actions
export type AllAction = TasksActionsType | TodolistActionsType

//typing dispatch for thunks
export type AppDispatchType = ThunkDispatch<AppRootType, any, AllAction>

//typing thunks
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootType, unknown, AllAction>

//custom hooks
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootType> = useSelector
