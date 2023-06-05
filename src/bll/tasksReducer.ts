import {TaskPriorities, tasksAPI, TaskStatuses, TaskTypeAPI, UpdateTaskType} from '../dal/todolist-api';
import {AddTodoListACType, DeleteTodoListACType, SetTodolistsACType} from './todolistReducer';
import {AppRootType, AppThunk} from './state';

const initialState: TasksType = {}

export const tasksReducer = (state = initialState, action: TasksActionsType): TasksType => {
    switch (action.type) {
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        case 'DELETE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id)
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el, ...action.payload.data
                } : el)
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

//action creators
export const deleteTaskAC = (todolistId: string, id: string) => ({
    type: 'DELETE-TASK',
    payload: {
        todolistId,
        id
    }
}) as const
export const updateTaskAC = (todolistId: string, id: string, data: UpdateTaskModelFlex) => ({
    type: 'UPDATE-TASK',
    payload: {
        todolistId,
        id,
        data
    }
}) as const
export const addTaskAC = (task: TaskTypeAPI) => ({
    type: 'ADD-TASK',
    payload: {
        task
    }
}) as const
export const setTasksAC = (todolistId: string, tasks: TaskTypeAPI[]) => ({
    type: 'SET-TASKS',
    todolistId,
    tasks
}) as const

//thunk creators
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    tasksAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(deleteTaskAC(todolistId, taskId))
        })
}
export const createTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    tasksAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, data: UpdateTaskModelFlex): AppThunk => (dispatch, getState: () => AppRootType) => {
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

//typing
type UpdateTaskModelFlex = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksType = {
    [key: string]: TaskTypeAPI[]
}
export type TasksActionsType =
    | ReturnType<typeof deleteTaskAC>
    | AddTodoListACType
    | ReturnType<typeof updateTaskAC>
    | DeleteTodoListACType
    | ReturnType<typeof addTaskAC>
    | SetTodolistsACType
    | ReturnType<typeof setTasksAC>
