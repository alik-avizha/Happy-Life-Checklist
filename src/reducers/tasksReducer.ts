import {TasksType} from '../components/App/App';
import {addTodoListACType, deleteTodoListACType} from './todolistReducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses, TaskTypeAPI} from '../api/todolist-api';

const initialState: TasksType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'DELETE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id)
            }
        case 'CHANGE-STATUS-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el, status:
                    action.payload.status
                } : el)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el, title:
                    action.payload.newValue
                } : el)
            }
        case 'ADD-TASK':
            const newTask: TaskTypeAPI = {
                description: '',
                title: action.payload.newTitle,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: action.payload.todolistId,
                order: 0,
                addedDate: ''
            }
            return {...state, [action.payload.todolistId]: [newTask,...state[action.payload.todolistId]]}
        case 'ADD-TODOLIST':
            return {...state, [action.payload.todolistId]: []}
        case 'DELETE-TODOLIST':
            let stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        default:
            return state
    }
}

type ActionsType =
    deleteTaskACType
    | addTodoListACType
    | changeStatusCheckedACType
    | changeTaskTitleACType
    | deleteTodoListACType
    | addTaskACACType

type deleteTaskACType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (todolistId: string, id: string) => {
    return {
        type: 'DELETE-TASK',
        payload: {
            todolistId,
            id
        }
    } as const
}

type changeStatusCheckedACType = ReturnType<typeof changeStatusCheckedAC>
export const changeStatusCheckedAC = (todolistId: string, id: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        payload: {
            todolistId,
            id,
            status
        }
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, id: string, newValue: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId,
            id,
            newValue
        }
    } as const
}

type addTaskACACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            newTitle
        }
    } as const
}
