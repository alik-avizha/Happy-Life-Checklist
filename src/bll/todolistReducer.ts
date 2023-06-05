import {todolistAPI, TodolistTypeAPI} from '../dal/todolist-api';
import {AppThunk} from './state';

const initialState: TodolistDomainType[] = []

export const todolistReducer = (state = initialState, action: TodolistActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'All'}))
        case 'DELETE-TODOLIST':
            return state.filter(t => t.id !== action.payload.todolistId)
        case 'ADD-TODOLIST':
            let newTodolist: TodolistDomainType = {...action.payload.todolist, filter: 'All'}
            return [newTodolist,...state]
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.payload.todolistId ? {...t, filter: action.payload.filter} : t)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.payload.todolistId ? {...t, title: action.payload.newTitle} : t)
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

//thunk creators
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    todolistAPI.getTodo()
        .then((res)=>{
            let todos = res.data
            dispatch(setTodolistsAC(todos))
        })
}
export const deleteTodolistsTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistAPI.deleteTodo(todolistId)
        .then(()=>{
            dispatch(deleteTodoListAC(todolistId))
        })
}
export const addTodolistsTC = (title: string): AppThunk => (dispatch) => {
    todolistAPI.createTodo(title)
        .then((res)=>{
            dispatch(addTodoListAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    todolistAPI.updateTodo(todolistId, title)
        .then(()=>{
            dispatch(changeTodoListTitleAC(todolistId, title))
        })
}

//typing
export type FilterType = 'All' | 'Active' | 'Completed'
export type TodolistDomainType = TodolistTypeAPI & {
    filter: FilterType
}
export type TodolistActionsType =
    | DeleteTodoListACType
    | AddTodoListACType
    | SetTodolistsACType
    | ReturnType<typeof changeFilterValueAC>
    | ReturnType<typeof changeTodoListTitleAC>
export type DeleteTodoListACType = ReturnType<typeof deleteTodoListAC>
export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
