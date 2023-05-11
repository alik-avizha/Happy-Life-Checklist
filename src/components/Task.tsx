import React, {ChangeEvent, memo, useCallback} from 'react';
import s from './Todolist.module.css';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from '../App';
import {changeStatusCheckedAC, changeTaskTitleAC, deleteTaskAC} from '../reducers/tasksReducer';
import {useDispatch} from 'react-redux';

type TaskPropsType = {
    todoId: string
    task: TaskType
}

export const Task = memo((props: TaskPropsType) => {

    const dispatch = useDispatch()

    const deleteHandler = () => {
        dispatch(deleteTaskAC(props.todoId, props.task.id))
    }
    const onChangeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatusCheckedAC(props.todoId, props.task.id, e.currentTarget.checked))
    }
    const onChangeTitle = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.todoId, props.task.id, newValue))
    },[dispatch,props.todoId,props.task.id])

    return (
        <div key={props.task.id} className={props.task.isDone ? s.completedTask : ''}>
            <Checkbox checked={props.task.isDone} onChange={onChangeStatusTask}/>
            <EditableSpan title={props.task.title} onChange={onChangeTitle}/>
            <IconButton onClick={deleteHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    );
});