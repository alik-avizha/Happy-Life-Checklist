import {v1} from 'uuid';
import {TasksType} from '../App';
import {changeStatusCheckedAC, changeTaskTitleAC, deleteTaskAC, tasksReducer} from './tasksReducer';

let todolistId1 = v1();
let todolistId2 = v1();

let startState : TasksType

beforeEach(() => {
    startState = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    }

})

test('correct tasks should be removed', () => {
    const endState = tasksReducer(startState, deleteTaskAC(todolistId1, startState[todolistId1][0].id))

    expect(endState[todolistId1].length).toBe(2);
    expect(endState[todolistId1][0].title).toBe('JS');
});

// test('correct todolist should be add', () => {
//
//     let newTodolistID = v1()
//     let newTodolistTitle = 'New todolist'
//
//
//     const endState = tasksReducer(startState, addTodoListAC(newTodolistID, newTodolistTitle))
// });


test('correct tasks Status should be changed', () => {

    let newStatus = false
    const endState = tasksReducer(startState, changeStatusCheckedAC(todolistId1,startState[todolistId1][0].id, newStatus))

    expect(endState[todolistId1][0].isDone).toBe(false);
});

test('correct tasks Title should be changed', () => {

    let newTitle = 'Hello'
    const endState = tasksReducer(startState, changeTaskTitleAC(todolistId1,startState[todolistId1][0].id, newTitle))

    expect(endState[todolistId1][0].title).toBe('Hello');
});

