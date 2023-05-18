import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, legacy_createStore} from 'redux';
import {v1} from 'uuid';
import {tasksReducer} from '../../reducers/tasksReducer';
import {todolistReducer} from '../../reducers/todolistReducer';
import {AppRootType} from '../../reducers/state';

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

const initialGlobalState = {
    todolists: [
        {todoId: "todolistId1", title: "What to learn", filter: "all"},
        {todoId: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}