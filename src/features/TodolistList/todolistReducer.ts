import {todolistAPI, TodolistTypeAPI} from '../../dal/todolist-api';
import {AppThunk} from '../../bll/state';
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../uttils/error-utils';

const initialState: TodolistDomainType[] = []

export const todolistReducer = (state = initialState, action: TodolistActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'All', entityStatus: 'idle'}))
        case 'DELETE-TODOLIST':
            return state.filter(t => t.id !== action.payload.todolistId)
        case 'ADD-TODOLIST':
            let newTodolist: TodolistDomainType = {...action.payload.todolist, filter: 'All', entityStatus: 'idle'}
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.payload.todolistId ? {...t, filter: action.payload.filter} : t)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.payload.todolistId ? {...t, title: action.payload.newTitle} : t)
        case 'TODO/CHANGE-ENTITY-STATUS':
            return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.status} : tl)
        default:
            return state
    }
}

//action creators
export const deleteTodoListAC = (todolistId: string) => ({
    type: 'DELETE-TODOLIST',
    payload: {
        todolistId
    }
}) as const
export const addTodoListAC = (todolist: TodolistTypeAPI) => ({
    type: 'ADD-TODOLIST',
    payload: {
        todolist
    }
}) as const
export const changeFilterValueAC = (todolistId: string, filter: FilterType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        todolistId,
        filter
    }
}) as const
export const changeTodoListTitleAC = (todolistId: string, newTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        todolistId,
        newTitle
    }
}) as const
export const setTodolistsAC = (todolists: TodolistTypeAPI[]) => ({type: 'SET-TODOLISTS', todolists}) as const
export const changeEntityStatusAC = (todolistId: string, status: RequestStatusType) => ({
    type: 'TODO/CHANGE-ENTITY-STATUS',
    todolistId,
    status
} as const)

//thunk creators
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodo()
        .then((res) => {
            let todos = res.data
            dispatch(setTodolistsAC(todos))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const deleteTodolistsTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeEntityStatusAC(todolistId, 'loading'))
    todolistAPI.deleteTodo(todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTodoListAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const addTodolistsTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodo(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeEntityStatusAC(todolistId, 'loading'))
    todolistAPI.updateTodo(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(todolistId, title))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
        .finally(()=>{
            dispatch(changeEntityStatusAC(todolistId, 'idle'))
        })
}

//typing
export type FilterType = 'All' | 'Active' | 'Completed'
export type TodolistDomainType = TodolistTypeAPI & {
    filter: FilterType
    entityStatus: RequestStatusType
}
export type TodolistActionsType =
    | DeleteTodoListACType
    | AddTodoListACType
    | SetTodolistsACType
    | ReturnType<typeof changeFilterValueAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeEntityStatusAC>
export type DeleteTodoListACType = ReturnType<typeof deleteTodoListAC>
export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
