import React, {useCallback} from 'react';
import {TaskType, TodoListsType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootType} from '../reducers/state';
import {addTaskAC} from '../reducers/tasksReducer';
import {changeFilterValueAC, changeTodoListTitleAC, deleteTodoListAC} from '../reducers/todolistReducer';
import {Task} from './Task';


type TodolistPropsType = {
    todoInfo: TodoListsType
}

export const Todolist = (props: TodolistPropsType) => {

    const {todoId, title, filter} = props.todoInfo

    const tasks = useSelector<AppRootType, TaskType[]>(state => state.tasks[todoId])
    const dispatch = useDispatch()

    let filteredTasks = tasks

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(todoId, title))
    }, [todoId, dispatch])

    const deleteTodoListHandler = useCallback(() => {
        dispatch(deleteTodoListAC(todoId))
    }, [dispatch, todoId])

    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(changeTodoListTitleAC(todoId, title))
    }, [dispatch, todoId])

    const onClickAllHandler = useCallback(() => {
        dispatch(changeFilterValueAC(todoId, 'All'))
    }, [dispatch, todoId])
    const onClickActiveHandler = useCallback(() => {
        dispatch(changeFilterValueAC(todoId, 'Active'))
    }, [dispatch, todoId])
    const onClickCompletedHandler = useCallback(() => {
        dispatch(changeFilterValueAC(todoId, 'Completed'))
    }, [dispatch, todoId])

    if (filter === 'Active') {
        filteredTasks = tasks.filter(f => !f.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter(f => f.isDone)
    }


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
