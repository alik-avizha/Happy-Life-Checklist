import { tasksSlice, TasksType } from "features/routing/todolist-list/tasks/model/tasks.slice";
import {
    TodolistDomainType,
    todolistSlice,
    todolistThunks,
} from "features/routing/todolist-list/todolists/model/todolist.slice";
import { TodolistTypeAPI } from "features/routing/todolist-list/todolists/api/todolist.api";

test("ids should be equals", () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    let todolist: TodolistTypeAPI = {
        title: "new todolist",
        id: "any id",
        addedDate: "",
        order: 0,
    };

    const action = todolistThunks.addTodolist.fulfilled({ todolist: todolist }, "requestId", { title: todolist.title });

    const endTasksState = tasksSlice(startTasksState, action);
    const endTodolistsState = todolistSlice(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});
