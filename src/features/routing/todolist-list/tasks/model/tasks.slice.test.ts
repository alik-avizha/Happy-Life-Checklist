import { tasksSlice, tasksThunks, TasksType } from "features/routing/todolist-list/tasks/model/tasks.slice";
import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses } from "common/enums/enums";
import { todolistThunks } from "features/routing/todolist-list/todolists/model/todolist.slice";

let todolistId1 = "todolistId1";
let todolistId2 = "todolistId2";

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

test("correct task should be deleted from correct array", () => {
    const endState = tasksSlice(
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

test("correct task should be added to correct array", () => {
    const task = {
        todoListId: "todolistId2",
        title: "juce",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: 0,
        startDate: "",
        id: "id exists",
        entityStatus: "idle",
    };

    const action = tasksThunks.addTasks.fulfilled({ task }, "requestId", {
        todolistId: task.todoListId,
        title: task.title,
    });

    const endState = tasksSlice(startState, action);

    expect(endState["todolistId1"]).toEqual(startState["todolistId1"]);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

test("correct tasks status should be changed", () => {
    let newStatus = TaskStatuses.New;
    let args = {
        todolistId: todolistId1,
        taskId: startState[todolistId1][0].id,
        data: { status: newStatus },
    };
    const endState = tasksSlice(startState, tasksThunks.updateTask.fulfilled(args, "requestId", args));

    expect(endState[todolistId1][0].status).toBe(TaskStatuses.New);
});

test("correct tasks title should be changed", () => {
    let newTitle = "Hello";
    let args = {
        todolistId: todolistId1,
        taskId: startState[todolistId1][0].id,
        data: { title: newTitle },
    };

    const endState = tasksSlice(startState, tasksThunks.updateTask.fulfilled(args, "requestId", args));
    expect(endState[todolistId1][0].title).toBe("Hello");
});

test("new array should be added when new todolist is added", () => {
    const todolist = {
        id: "blabla",
        title: "new todolist",
        order: 0,
        addedDate: "",
    };

    const action = todolistThunks.addTodolist.fulfilled({ todolist }, "requestId", { title: todolist.title });

    const endState = tasksSlice(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added");
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
    const id = "todolistId2";
    const action = todolistThunks.deleteTodolists.fulfilled({ todolistId: id }, "requestId", { todolistId: id });

    const endState = tasksSlice(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test("empty arrays should be added when we set todolists", () => {
    const action = todolistThunks.fetchTodolists.fulfilled(
        {
            todolists: [
                { id: "1", title: "title 1", order: 0, addedDate: "" },
                { id: "2", title: "title 2", order: 0, addedDate: "" },
            ],
        },
        "requestId"
    );

    const endState = tasksSlice({}, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["1"]).toBeDefined();
    expect(endState["2"]).toBeDefined();
});

test("tasks should be added for todolist", () => {
    const action = tasksThunks.fetchTasks.fulfilled(
        {
            tasks: startState["todolistId1"],
            todolistId: "todolistId1",
        },
        "requestId",
        "todolistId1"
    );

    const endState = tasksSlice(
        {
            todolistId2: [],
            todolistId1: [],
        },
        action
    );

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
});
