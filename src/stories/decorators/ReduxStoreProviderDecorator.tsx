import React from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {v1} from 'uuid';
import {tasksReducer} from '../../features/TodolistList/Todlist/Task/tasksReducer';
import {todolistReducer} from '../../features/TodolistList/todolistReducer';
import {AppRootType} from '../../bll/state';
import {TaskPriorities, TaskStatuses} from '../../dal/todolist-api';
import {appReducer} from '../../app/app-reducer';
import thunk from 'redux-thunk';
import {authReducer} from '../../features/Login/auth-reducer';
import {BrowserRouter} from 'react-router-dom';

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: AppRootType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'All', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'All', addedDate: '', order: 1, entityStatus: 'idle'}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                order: 0,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Hi,
                todoListId: 'todolistId1',
                deadline: '',
                description: '',
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.New,
                order: 0,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Hi,
                todoListId: 'todolistId1',
                deadline: '',
                description: '',
                entityStatus: 'idle'
            }
        ],
        ['todolistId2']: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.New,
                order: 0,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Hi,
                todoListId: 'todolistId2',
                deadline: '',
                description: '',
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: 'React Book',
                status: TaskStatuses.Completed,
                order: 0,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Hi,
                todoListId: 'todolistId2',
                deadline: '',
                description: '',
                entityStatus: 'idle'
            }
        ]
    },
    app: {
        status: 'idle',
        error: null
    },
    auth: {
        isLoggedIn: false,
        isInitialized: false
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <BrowserRouter><Provider store={storyBookStore}>
            {storyFn()}
    </Provider></BrowserRouter>
}