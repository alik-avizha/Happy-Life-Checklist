import React from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {AddItemForm} from './components/AddItemForm';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootType} from './reducers/state';
import {addTodoListAC} from './reducers/todolistReducer';

export type FilterType = 'All' | 'Active' | 'Completed'
export type TodoListsType = {
    todoId: string
    title: string
    filter: FilterType
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TasksType = {
    [key: string]: TaskType[]
}


function App() {

    const todoLists = useSelector<AppRootType, TodoListsType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodoList = (title: string) => {
        dispatch(addTodoListAC(title))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(el => {

                        return (<Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={el.todoId}
                                        todoInfo={el}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
