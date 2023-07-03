import { AxiosResponse } from "axios";
import { instance, ResponseType } from "common/apiSettings/common.api";

//api
export const todolistApi = {
    getTodo() {
        return instance.get<TodolistTypeAPI[]>(`todo-lists`);
    },
    createTodo(todoTitle: string) {
        return instance.post<
            ResponseType<TodolistTypeAPI>,
            AxiosResponse<ResponseType<TodolistTypeAPI>>,
            { title: string }
        >(`todo-lists`, { title: todoTitle });
    },
    updateTodo(todoId: string, todoTitle: string) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${todoId}`, {
            title: todoTitle,
        });
    },
    deleteTodo(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`);
    },
};
//typing
export type TodolistTypeAPI = {
    id: string;
    addedDate: string;
    order: number;
    title: string;
};
