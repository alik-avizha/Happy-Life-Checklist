import React, { useEffect, useState } from "react";
import { todolistApi } from "features/todolist-list/todolists/api/todolist.api";
import { tasksAPI } from "features/todolist-list/tasks/api/tasks.api";

export default {
    title: "API",
};

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistApi.getTodo().then((response) => {
            setState(response.data);
        });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<string>("");

    const createTodo = () => {
        todolistApi.createTodo(title).then((response) => {
            setState(response.data);
        });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <input placeholder={"title"} value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
            <button onClick={createTodo}>createTodo</button>
        </div>
    );
};
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todoId, setTodoId] = useState<string>("");

    const deleteTodo = () => {
        todolistApi.deleteTodo(todoId).then((response) => {
            setState(response.data);
        });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <input placeholder={"todoId"} value={todoId} onChange={(e) => setTodoId(e.currentTarget.value)} />
            <button onClick={deleteTodo}>deleteTodo</button>
        </div>
    );
};
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todoId, setTodoId] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const updateTodo = () => {
        todolistApi.updateTodo(todoId, title).then((response) => {
            setState(response.data);
        });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <input placeholder={"todoId"} value={todoId} onChange={(e) => setTodoId(e.currentTarget.value)} />
            <input placeholder={"title"} value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
            <button onClick={updateTodo}>updateTodo</button>
        </div>
    );
};

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todoId, setTodoId] = useState<string>("");

    const getTasks = () => {
        tasksAPI.getTasks(todoId).then((res) => setState(res.data));
    };
    return (
        <div>
            {JSON.stringify(state)}
            <input placeholder={"todoId"} value={todoId} onChange={(e) => setTodoId(e.currentTarget.value)} />
            <button onClick={getTasks}>getTasks</button>
        </div>
    );
};
export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todoId, setTodoId] = useState<string>("");
    const [taskTitle, setTaskTitle] = useState<string>("");

    const createTask = () => {
        tasksAPI.createTask(todoId, taskTitle).then((res) => setState(res.data));
    };
    return (
        <div>
            {JSON.stringify(state)}
            <input placeholder={"todoId"} value={todoId} onChange={(e) => setTodoId(e.currentTarget.value)} />
            <input placeholder={"taskTitle"} value={taskTitle} onChange={(e) => setTaskTitle(e.currentTarget.value)} />
            <button onClick={createTask}>createTasks</button>
        </div>
    );
};
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todoId, setTodoId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");
    const [title, setTaskTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>("");
    const [deadline, setDeadline] = useState<string>("");

    const updateTask = () => {
        tasksAPI
            .updateTask(todoId, taskId, {
                title,
                description,
                status,
                priority,
                startDate,
                deadline,
            })
            .then((res) => setState(res.data));
    };
    return (
        <div>
            {JSON.stringify(state)}
            <input placeholder={"todoId"} value={todoId} onChange={(e) => setTodoId(e.currentTarget.value)} />
            <input placeholder={"taskId"} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)} />
            <input placeholder={"taskTitle"} value={title} onChange={(e) => setTaskTitle(e.currentTarget.value)} />
            <input
                placeholder={"description"}
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
            />
            <input placeholder={"status"} value={status} onChange={(e) => setStatus(+e.currentTarget.value)} />
            <input placeholder={"priority"} value={priority} onChange={(e) => setPriority(+e.currentTarget.value)} />
            <button onClick={updateTask}>createTasks</button>
        </div>
    );
};
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [todoId, setTodoId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");

    const deleteTask = () => {
        tasksAPI.deleteTask(todoId, taskId).then((res) => setState(res.data));
    };

    return (
        <div>
            {JSON.stringify(state)}
            <input placeholder={"todoId"} value={todoId} onChange={(e) => setTodoId(e.currentTarget.value)} />
            <input placeholder={"taskId"} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)} />

            <button onClick={deleteTask}>createTasks</button>
        </div>
    );
};
