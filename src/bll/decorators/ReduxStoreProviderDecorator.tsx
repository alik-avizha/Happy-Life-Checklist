import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, legacy_createStore} from 'redux';
import {v1} from 'uuid';
import {tasksReducer} from '../tasksReducer';
import {todolistReducer} from '../todolistReducer';
import {AppRootType} from '../state';
import {TaskPriorities, TaskStatuses} from '../../dal/todolist-api';

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

const initialGlobalState: AppRootType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "All", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "All", addedDate: '', order: 1}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, order: 0, addedDate: '',startDate: '',priority: TaskPriorities.Hi, todoListId: "todolistId1", deadline: '', description: ''},
            {id: v1(), title: "JS", status: TaskStatuses.New, order: 0, addedDate: '',startDate: '',priority: TaskPriorities.Hi, todoListId: "todolistId1", deadline: '', description: ''}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.New, order: 0, addedDate: '',startDate: '',priority: TaskPriorities.Hi, todoListId: "todolistId2", deadline: '', description: ''},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, order: 0, addedDate: '',startDate: '',priority: TaskPriorities.Hi, todoListId: "todolistId2", deadline: '', description: ''}
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}