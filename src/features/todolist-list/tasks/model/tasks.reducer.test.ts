import { tasksReducer, tasksThunks, TasksType } from "features/todolist-list/tasks/model/tasks.reducer";
import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses } from "common/enums/enums";

let todolistId1 = v1();
let todolistId2 = v1();

let startState: TasksType;

beforeEach(() => {
    startState = {
        [todolistId1]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                todoListId: todolistId1,
                addedDate: "",
                deadline: "",
                order: 0,
                startDate: "",
                description: "",
                priority: TaskPriorities.Hi,
                entityStatus: "idle",
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: todolistId1,
                addedDate: "",
                deadline: "",
                order: 1,
                startDate: "",
                description: "",
                priority: TaskPriorities.Hi,
                entityStatus: "idle",
            },
            {
                id: v1(),
                title: "ReactJS",
                status: TaskStatuses.New,
                todoListId: todolistId1,
                addedDate: "",
                deadline: "",
                order: 2,
                startDate: "",
                description: "",
                priority: TaskPriorities.Hi,
                entityStatus: "idle",
            },
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: "Rest API",
                status: TaskStatuses.Completed,
                todoListId: todolistId2,
                addedDate: "",
                deadline: "",
                order: 0,
                startDate: "",
                description: "",
                priority: TaskPriorities.Hi,
                entityStatus: "idle",
            },
            {
                id: v1(),
                title: "GraphQL",
                status: TaskStatuses.New,
                todoListId: todolistId2,
                addedDate: "",
                deadline: "",
                order: 1,
                startDate: "",
                description: "",
                priority: TaskPriorities.Hi,
                entityStatus: "idle",
            },
        ],
    };
});

test("correct tasks should be removed", () => {
    const endState = tasksReducer(
        startState,
        tasksThunks.deleteTask.fulfilled(
            { todolistId: todolistId1, taskId: startState[todolistId1][0].id },
            "requestId",
            { todolistId: todolistId1, taskId: startState[todolistId1][0].id }
        )
    );

    expect(endState[todolistId1].length).toBe(2);
    expect(endState[todolistId1][0].title).toBe("JS");
});

test("correct tasks Status should be changed", () => {
    let newStatus = TaskStatuses.New;
    let args = {
        todolistId: todolistId1,
        taskId: startState[todolistId1][0].id,
        data: { status: newStatus },
    };
    const endState = tasksReducer(startState, tasksThunks.updateTask.fulfilled(args, "requestId", args));

    expect(endState[todolistId1][0].status).toBe(TaskStatuses.New);
});

test("correct tasks Title should be changed", () => {
    let newTitle = "Hello";
    let args = {
        todolistId: todolistId1,
        taskId: startState[todolistId1][0].id,
        data: { title: newTitle },
    };

    const endState = tasksReducer(startState, tasksThunks.updateTask.fulfilled(args, "requestId", args));
    expect(endState[todolistId1][0].title).toBe("Hello");
});
