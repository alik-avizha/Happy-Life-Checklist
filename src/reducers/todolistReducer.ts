import {FilterType, TodoListsType} from '../App';
import {v1} from 'uuid';

const initialState: TodoListsType[] =[]



export const todolistReducer = (state = initialState, action: ActionsType): TodoListsType[] => {
    switch (action.type) {
        case 'DELETE-TODOLIST':
            return state.filter(t => t.todoId !== action.payload.todolistId)
        case 'ADD-TODOLIST':
            let newTodolist: TodoListsType = {todoId: action.payload.todolistId, title: action.payload.title, filter: 'All'}
            return [...state, newTodolist]
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.todoId === action.payload.todolistId ? {...t, filter: action.payload.filter} : t)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.todoId === action.payload.todolistId ? {...t, title: action.payload.newTitle} : t)
        default:
            return state
    }
}

type ActionsType = deleteTodoListACType | addTodoListACType | changeFilterValueACType | changeTodoListTitleACType

export type deleteTodoListACType = ReturnType<typeof deleteTodoListAC>
export const deleteTodoListAC = (todolistId: string) => {
    return {
        type: 'DELETE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (title: string) => {
    return {
        type : 'ADD-TODOLIST',
        payload: {
            title,
            todolistId: v1()
        }
    } as const
}

type changeFilterValueACType = ReturnType<typeof changeFilterValueAC>
export const changeFilterValueAC = (todolistId: string, filter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            filter
        }
    } as const
}

type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (todolistId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            newTitle
        }
    } as const
}