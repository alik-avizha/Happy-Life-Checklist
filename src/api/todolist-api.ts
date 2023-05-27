import axios from 'axios'


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true
})

export type TodolistType = {
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


export const todolistAPI = {
    getTodo() {
        return instance.get<TodolistType[]>(`todo-lists`)
    },
    createTodo(todoTitle: string) {
        return instance.post<ResponseType<TodolistType>>(`todo-lists`,{title: todoTitle})
    },
    updateTodo(todoId:string,todoTitle: string){
        return instance.put<ResponseType>(`todo-lists/${todoId}`,{title: todoTitle})
    },
    deleteTodo(todoId:string){
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    }
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type UpdateTask = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}
type GetTaskResponse = {
    items: TaskType
    totalCount: number
    error: string
}

export const tasksAPI = {
    getTasks(todoId:string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todoId}/tasks`)
    },
    createTask(todoId:string, taskTitle: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todoId}/tasks`,{title: taskTitle})
    },
    updateTask(todoId:string,taskId: string, model: UpdateTask){
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todoId}/tasks/${taskId}`,model)
    },
    deleteTask(todoId:string,taskId: string){
        return instance.delete<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
    }
}
