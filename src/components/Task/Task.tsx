import React, {memo} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTask} from './useTask';
import {TaskStatuses, TaskTypeAPI} from '../../api/todolist-api';

type TaskPropsType = {
    todoId: string
    task: TaskTypeAPI
}

export const Task = memo((props: TaskPropsType) => {

    const {deleteHandler,onChangeStatusTask, onChangeTitle} = useTask(props.todoId,props.task.id)

    return (
        <div>
            <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={onChangeStatusTask}/>
            <EditableSpan title={props.task.title} onChange={onChangeTitle}/>
            <IconButton onClick={deleteHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    );
});