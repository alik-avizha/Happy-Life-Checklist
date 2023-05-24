import React from 'react';
import {TodoListsType} from '../App/App';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {Task} from '../Task/Task';
import {useTodolist} from './useTodolist';


type TodolistPropsType = {
    todoInfo: TodoListsType
}

export const Todolist = (props: TodolistPropsType) => {

    const {todoId, title, filter} = props.todoInfo

    const {
        filteredTasks,
        addTaskHandler,
        deleteTodoListHandler,
        changeTodoListTitle,
        onClickAllHandler,
        onClickActiveHandler,
        onClickCompletedHandler
    } = useTodolist(todoId, title, filter)

    const mappingTasks = filteredTasks.map(t => {
        return (
            <Task
                key={t.id}
                todoId={todoId}
                task={t}
            />
        )
    })
    return (
        <div>
            <h3>
                <EditableSpan title={title} onChange={changeTodoListTitle}/>
                <IconButton onClick={deleteTodoListHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <div>
                {mappingTasks}
            </div>
            <div>
                <div>
                    <Button color="primary" variant={filter === 'All' ? 'contained' : 'outlined'}
                            onClick={onClickAllHandler}>All</Button>
                    <Button color="secondary" variant={filter === 'Active' ? 'contained' : 'outlined'}
                            onClick={onClickActiveHandler}>Active</Button>
                    <Button color="error" variant={filter === 'Completed' ? 'contained' : 'outlined'}
                            onClick={onClickCompletedHandler}>Completed</Button>
                </div>
            </div>
        </div>
    );
};
