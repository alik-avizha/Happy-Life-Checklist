import {v1} from 'uuid';
import {TaskPriorities, tasksAPI, TaskStatuses, TaskTypeAPI, UpdateTaskType} from '../dal/todolist-api';

import {Dispatch} from 'redux';
import {AddTodoListACType, DeleteTodoListACType, SetTodolistsACType} from './todolistReducer';
import {AppRootType} from './state';


export type TasksType = {
    [key: string]: TaskTypeAPI[]
}

const initialState: TasksType = {}

export const tasksReducer = (state = initialState, action: TasksActionsType): TasksType => {
    switch (action.type) {
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
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
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        case 'DELETE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id)
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el, ...action.payload.data} : el)
            }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'ADD-TODOLIST':
            return {...state, [action.payload.todolist.id]: []}
        case 'DELETE-TODOLIST':
            let stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        default:
            return state
    }
}

export type TasksActionsType =
    DeleteTaskACType
    | AddTodoListACType
    | UpdateTaskACType
    | DeleteTodoListACType
    | AddTaskACType
    | SetTodolistsACType
    | SetTasksACType

type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (todolistId: string, id: string) => {
    return {
        type: 'DELETE-TASK',
        payload: {
            todolistId,
            id
        }
    } as const
}

type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistId: string, id: string, data: UpdateTaskModelFlex) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todolistId,
            id,
            data
        }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            newTitle
        }
    } as const
}

type SetTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistId: string, tasks: TaskTypeAPI[]) => {
    return {type: 'SET-TASKS', todolistId, tasks} as const
}

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(deleteTaskAC(todolistId, taskId))
        })
}
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistId, title)
        .then(() => {
            dispatch(addTaskAC(todolistId, title))
        })
}


type UpdateTaskModelFlex = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, data: UpdateTaskModelFlex) => (dispatch: Dispatch, getState: () => AppRootType) => {
    const task = getState().tasks[todolistId].find(t => t.id === taskId)
    if (task) {
        const model: UpdateTaskType = {
            title: task.title,
            status: task.status,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            description: task.description,
            ...data
        }
        tasksAPI.updateTask(todolistId, taskId, model)
            .then(() => {
                dispatch(updateTaskAC(todolistId, taskId, data))
            })
    }
}


