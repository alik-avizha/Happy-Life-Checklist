import {v1} from 'uuid';
import {TodoListsType} from '../components/App/App';
import {
    addTodoListAC,
    changeFilterValueAC,
    changeTodoListTitleAC,
    deleteTodoListAC,
    todolistReducer
} from './todolistReducer';

let todolistId1: string;
let todolistId2: string;

let startState: Array<TodoListsType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {todoId: todolistId1, title: 'What to learn', filter: 'All'},
        {todoId: todolistId2, title: 'What to buy', filter: 'All'},
    ]
})

test('correct todoList should be removed', () => {
    const endState = todolistReducer(startState, deleteTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].todoId).toBe(todolistId2);
});

test('correct todoList should be add', () => {

    const endState = todolistReducer(startState, addTodoListAC('What to do'))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe('What to do');
    expect(endState.length).not.toBe(startState.length)
});

test('correct todoList should be changed Filter', () => {

    const endState = todolistReducer(startState, changeFilterValueAC(todolistId2, 'Completed'))

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe('Completed');
});

test('correct todoList should be changed Title', () => {

    const endState = todolistReducer(startState, changeTodoListTitleAC(todolistId2, 'Hello Friend'))

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe('Hello Friend');
});
