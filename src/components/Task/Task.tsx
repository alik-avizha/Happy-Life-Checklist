import React, {memo} from 'react';
import s from '../Todolist/Todolist.module.css';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from '../App/App';
import {useTask} from './useTask';

type TaskPropsType = {
    todoId: string
    task: TaskType
}

export const Task = memo((props: TaskPropsType) => {

    const {deleteHandler,onChangeStatusTask, onChangeTitle} = useTask(props.todoId,props.task.id)

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