import axios, {AxiosResponse} from 'axios';

//settings
const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true
})

//api
export const todolistAPI = {
    getTodo() {
        return instance.get<TodolistTypeAPI[]>(`todo-lists`)
    },
    createTodo(todoTitle: string) {
        return instance.post<ResponseType<TodolistTypeAPI>, AxiosResponse<ResponseType<TodolistTypeAPI>>, {title: string}>(`todo-lists`,{title: todoTitle})
    },
    updateTodo(todoId:string,todoTitle: string){
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${todoId}`,{title: todoTitle})
    },
    deleteTodo(todoId:string){
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    }
}
export const tasksAPI = {
    getTasks(todoId:string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todoId}/tasks`)
    },
    createTask(todoId:string, taskTitle: string) {
        return instance.post<ResponseType<TaskTypeAPI>, AxiosResponse<ResponseType<TaskTypeAPI>>, {title: string}>(`todo-lists/${todoId}/tasks`,{title: taskTitle})
    },
    updateTask(todoId:string,taskId: string, model: UpdateTaskType){
        return instance.put<ResponseType<TaskTypeAPI>, AxiosResponse<ResponseType<TaskTypeAPI>>, UpdateTaskType>(`todo-lists/${todoId}/tasks/${taskId}`,model)
    },
    deleteTask(todoId:string,taskId: string){
        return instance.delete<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
    }
}

//typing
export type TodolistTypeAPI = {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseType<T = {}>={
    resultCode: number
    messages: string[],
    fieldsErrors: string[]
    data: {
        item: T
    }
}
export type TaskTypeAPI = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
type GetTaskResponse = {
    items: TaskTypeAPI[]
    totalCount: number
    error: string
}
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}
