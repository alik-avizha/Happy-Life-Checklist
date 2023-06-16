import {TaskPriorities, tasksAPI, TaskStatuses, TaskTypeAPI, UpdateTaskType} from '../../../../dal/todolist-api';
import {AddTodoListACType, DeleteTodoListACType, SetTodolistsACType} from '../../todolistReducer';
import {AppRootType, AppThunk} from '../../../../bll/state';
import {RequestStatusType, setAppStatusAC} from '../../../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../../uttils/error-utils';

const initialState: TasksType = {}

export const tasksReducer = (state = initialState, action: TasksActionsType): TasksType => {
    switch (action.type) {
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks.map(t => ({...t, entityStatus: 'idle'}))}
        case 'ADD-TASK':
            const task: TaskDomainType = {...action.payload.task, entityStatus: 'idle'}
            return {
                ...state,
                [action.payload.task.todoListId]: [task, ...state[action.payload.task.todoListId]]
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
        case 'TASK/CHANGE-TASK-ENTITY-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el, entityStatus: action.status
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
export const changeTasksEntityStatusAC = (todolistId: string, taskId :string, status: RequestStatusType) => ({
    type: 'TASK/CHANGE-TASK-ENTITY-STATUS',
    todolistId,
    taskId,
    status
}) as const

//thunk creators
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTasksEntityStatusAC(todolistId,taskId,'loading'))
    tasksAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTaskAC(todolistId, taskId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
        .finally(()=>{
            dispatch(changeTasksEntityStatusAC(todolistId,taskId,'idle'))
        })
}
export const createTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.createTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, data: UpdateTaskModelFlex): AppThunk => (dispatch, getState: () => AppRootType) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTasksEntityStatusAC(todolistId,taskId,'loading'))
    const task = getState().tasks[todolistId].find(t => t.id === taskId)
    if (task) {
        const model: UpdateTaskType = {...task, ...data}
        tasksAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistId, taskId, data))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(err => {
                handleServerNetworkError(err, dispatch)
            })
            .finally(()=>{
                dispatch(changeTasksEntityStatusAC(todolistId,taskId,'idle'))
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

export type TaskDomainType = TaskTypeAPI & {entityStatus: RequestStatusType}

export type TasksType = {
    [key: string]: TaskDomainType[]
}
export type TasksActionsType =
    | ReturnType<typeof deleteTaskAC>
    | AddTodoListACType
    | ReturnType<typeof updateTaskAC>
    | DeleteTodoListACType
    | ReturnType<typeof addTaskAC>
    | SetTodolistsACType
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTasksEntityStatusAC>
