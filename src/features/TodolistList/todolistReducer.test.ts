import { v1 } from "uuid";
import { todolistActions, TodolistDomainType, todolistReducer, todolistThunks } from "./todolistReducer";

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
    const endState = todolistReducer(
        startState,
        todolistThunks.deleteTodolists.fulfilled({ todolistId: todolistId1 }, "requestId", { todolistId: todolistId1 })
    );

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test("correct todoList should be add", () => {
    const endState = todolistReducer(
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

test("correct todoList should be changed Filter", () => {
    const endState = todolistReducer(
        startState,
        todolistActions.changeTodolistFilter({ todolistId: todolistId2, filter: "Completed" })
    );

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe("Completed");
});

test("correct todoList should be changed Title", () => {
    const endState = todolistReducer(
        startState,
        todolistThunks.changeTodolistTitle.fulfilled({ todolistId: todolistId2, title: "Hello Friend" }, "requestId", {
            todolistId: todolistId2,
            title: "Hello Friend",
        })
    );
    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe("Hello Friend");
});
