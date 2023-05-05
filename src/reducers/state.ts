import {combineReducers, legacy_createStore} from 'redux';
import {todolistReducer} from './todolistReducer';
import {tasksReducer} from './tasksReducer';


const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer)

export type AppRootType = ReturnType<typeof rootReducer>