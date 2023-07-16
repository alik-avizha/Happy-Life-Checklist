import { AxiosResponse } from "axios";
import { instance } from "common/api/common.api";
import { TaskPriorities, TaskStatuses } from "common/enums/enums";
import { ResponseType } from "common/types";

//api
export const tasksAPI = {
    getTasks(todoId: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todoId}/tasks`);
    },
    createTask(todoId: string, taskTitle: string) {
        return instance.post<ResponseType<TaskTypeAPI>, AxiosResponse<ResponseType<TaskTypeAPI>>, { title: string }>(
            `todo-lists/${todoId}/tasks`,
            { title: taskTitle }
        );
    },
    updateTask(todoId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<ResponseType<TaskTypeAPI>, AxiosResponse<ResponseType<TaskTypeAPI>>, UpdateTaskType>(
            `todo-lists/${todoId}/tasks/${taskId}`,
            model
        );
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`);
    },
};

//typing
export type TaskTypeAPI = {
    description: string;
    title: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};
export type UpdateTaskType = {
    title: string;
    description: string;
    status: number;
    priority: number;
    startDate: string;
    deadline: string;
};
type GetTaskResponse = {
    items: TaskTypeAPI[];
    totalCount: number;
    error: string;
};
