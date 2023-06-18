import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TodolistActionsType, todolistReducer} from '../features/TodolistList/todolistReducer';
import {TasksActionsType, tasksReducer} from '../features/TodolistList/Todlist/Task/tasksReducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppActionsType, appReducer} from '../app/app-reducer';
import {authReducer} from '../features/Login/auth-reducer';

//initialization rootReducer
const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

//create store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

//typing store
export type AppRootType = ReturnType<typeof rootReducer>

//typing all actions
export type AllAction = TasksActionsType | TodolistActionsType | AppActionsType

//typing dispatch for thunks
export type AppDispatchType = ThunkDispatch<AppRootType, any, AllAction>

//typing thunks
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootType, unknown, AllAction>

//custom hooks
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootType> = useSelector

// @ts-ignore
window.store = store