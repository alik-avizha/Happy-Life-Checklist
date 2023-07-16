import { v1 } from "uuid";
import {
    todolistActions,
    TodolistDomainType,
    todolistSlice,
    todolistThunks,
} from "features/routing/todolist-list/todolists/model/todolist.slice";
import { RequestStatusType } from "app/model/app.slice";

let todolistId1: string;
let todolistId2: string;

let startState: Array<TodolistDomainType>;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        { id: todolistId1, title: "What to learn", filter: "All", order: 0, addedDate: "", entityStatus: "idle" },
        { id: todolistId2, title: "What to buy", filter: "All", order: 1, addedDate: "", entityStatus: "idle" },
    ];
});
test("correct todoList should be removed", () => {
    const endState = todolistSlice(
        startState,
        todolistThunks.deleteTodolists.fulfilled({ todolistId: todolistId1 }, "requestId", { todolistId: todolistId1 })
    );

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test("correct todoList should be added", () => {
    const endState = todolistSlice(
        startState,
        todolistThunks.addTodolist.fulfilled(
            { todolist: { id: v1(), title: "What to do", addedDate: "", order: 0 } },
            "requestId",
            { title: "What to do" }
        )
    );

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("What to do");
    expect(endState.length).not.toBe(startState.length);
});
test("correct filter of todolist should be changed", () => {
    const endState = todolistSlice(
        startState,
        todolistActions.changeTodolistFilter({ todolistId: todolistId2, filter: "Completed" })
    );

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe("Completed");
});
test("correct todolist should change its name", () => {
    const endState = todolistSlice(
        startState,
        todolistThunks.changeTodolistTitle.fulfilled({ todolistId: todolistId2, title: "Hello Friend" }, "requestId", {
            todolistId: todolistId2,
            title: "Hello Friend",
        })
    );
    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe("Hello Friend");
});
test("correct entity status of todolist should be changed", () => {
    let newStatus: RequestStatusType = "loading";

    const action = todolistActions.changeTodolistEntityStatus({ todolistId: todolistId2, status: newStatus });

    const endState = todolistSlice(startState, action);

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});
