import type { Meta, StoryObj } from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task} from '../components/Task/Task';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';
import {useDispatch, useSelector} from 'react-redux';
import {changeStatusCheckedAC, changeTaskTitleAC} from '../reducers/tasksReducer';
import React, {ChangeEvent, useCallback} from 'react';
import s from '../components/Todolist/Todolist.module.css';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from '../components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {AppRootType} from '../reducers/state';
import {TaskType} from '../components/App/App';

const meta: Meta<typeof Task> = {
  title: 'TodoLists/Task',
  component: Task,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],

};

export default meta;
type Story = StoryObj<typeof Task>;

const TaskWithRedux = () => {

  let task = useSelector<AppRootType, TaskType>(state => state.tasks['todolistId1'][0])

  let todoId = 'todolistId1'

  const dispatch = useDispatch()

  /*const deleteHandler = () => {
    dispatch(deleteTaskAC(todoId, task.id))
  }*/

  const onChangeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeStatusCheckedAC(todoId, task.id, e.currentTarget.checked))
  }
  const onChangeTitle = useCallback((newValue: string) => {
    dispatch(changeTaskTitleAC(todoId, task.id, newValue))
  },[dispatch,todoId,task.id])

  return (
      <div className={task.isDone ? s.completedTask : ''}>
        <Checkbox checked={task.isDone} onChange={onChangeStatusTask}/>
        <EditableSpan title={task.title} onChange={onChangeTitle}/>
        <IconButton onClick={action('Task deleted')}>
          <DeleteIcon/>
        </IconButton>
      </div>
  );
}

export const TaskStory: Story = {
  render: () => <TaskWithRedux/>
};

