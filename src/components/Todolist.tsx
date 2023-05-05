import React, {ChangeEvent} from 'react';
import {TaskType, TodoListsType} from '../App';
import s from './Todolist.module.css'
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootType} from '../reducers/state';
import {addTaskAC, changeStatusCheckedAC, changeTaskTitleAC, deleteTaskAC} from '../reducers/tasksReducer';
import {changeFilterValueAC, changeTodoListTitleAC, deleteTodoListAC} from '../reducers/todolistReducer';


type TodolistPropsType = {
    todoInfo: TodoListsType
}

export const Todolist = (props: TodolistPropsType) => {

    const {todoId, title, filter} = props.todoInfo

    const tasks = useSelector<AppRootType, TaskType[]>(state => state.tasks[todoId])
    const dispatch = useDispatch()

    let filteredTasks = tasks

    if (filter === 'Active') {
        filteredTasks = tasks.filter(f => !f.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter(f => f.isDone)
    }

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(todoId, title))
    }
    const deleteTodoListHandler = () => {
        dispatch(deleteTodoListAC(todoId))
    }
    const changeTodoListTitle = (title: string) => {
        dispatch(changeTodoListTitleAC(todoId, title))
    }
    const onClickAllHandler = () => {
        dispatch(changeFilterValueAC(todoId, 'All'))
    }
    const onClickActiveHandler = () => {
        dispatch(changeFilterValueAC(todoId, 'Active'))
    }
    const onClickCompletedHandler = () => {
        dispatch(changeFilterValueAC(todoId, 'Completed'))
    }

    const mappingTasks = filteredTasks.map(t => {

        const deleteHandler = () => {
            dispatch(deleteTaskAC(todoId, t.id))
        }
        const onChangeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeStatusCheckedAC(todoId, t.id, e.currentTarget.checked))
        }
        const onChangeTitle = (newValue: string) => {
            dispatch(changeTaskTitleAC(todoId, t.id, newValue))
        }

        return (
            <div key={t.id} className={t.isDone ? s.completedTask : ''}>
                <Checkbox checked={t.isDone} onChange={onChangeStatusTask}/>
                <EditableSpan title={t.title} onChange={onChangeTitle}/>
                <IconButton onClick={deleteHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
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
