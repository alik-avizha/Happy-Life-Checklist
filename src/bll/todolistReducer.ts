import {todolistAPI, TodolistTypeAPI} from '../dal/todolist-api';
import {Dispatch} from 'redux';

export type FilterType = 'All' | 'Active' | 'Completed'

export type TodolistDomainType = TodolistTypeAPI & {
    filter: FilterType
}

const initialState: TodolistDomainType[] = []

export const todolistReducer = (state = initialState, action: TodolistActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'All'}))
        case 'DELETE-TODOLIST':
            return state.filter(t => t.id !== action.payload.todolistId)
        case 'ADD-TODOLIST':
            let newTodolist: TodolistDomainType = {
                id: action.payload.todolist.id,
                title: action.payload.todolist.title,
                filter: 'All',
                order: action.payload.todolist.order,
                addedDate: action.payload.todolist.addedDate
            }
            return [...state, newTodolist]
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.payload.todolistId ? {...t, filter: action.payload.filter} : t)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.payload.todolistId ? {...t, title: action.payload.newTitle} : t)
        default:
            return state
    }
}

export type TodolistActionsType =
    DeleteTodoListACType
    | AddTodoListACType
    | ChangeFilterValueACType
    | ChangeTodoListTitleACType
    | SetTodolistsACType

export type DeleteTodoListACType = ReturnType<typeof deleteTodoListAC>
export const deleteTodoListAC = (todolistId: string) => {
    return {
        type: 'DELETE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (todolist: TodolistTypeAPI) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolist
        }
    } as const
}

type ChangeFilterValueACType = ReturnType<typeof changeFilterValueAC>
export const changeFilterValueAC = (todolistId: string, filter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            filter
        }
    } as const
}

type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (todolistId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            newTitle
        }
    } as const
}

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: TodolistTypeAPI[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodo()
        .then((res)=>{
            let todos = res.data
            dispatch(setTodolistsAC(todos))
        })
}

export const deleteTodolistsTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodo(todolistId)
        .then(()=>{
            dispatch(deleteTodoListAC(todolistId))
        })
}
export const addTodolistsTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodo(title)
        .then((res)=>{
            dispatch(addTodoListAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodo(todolistId, title)
        .then(()=>{
            dispatch(changeTodoListTitleAC(todolistId, title))
        })
}
