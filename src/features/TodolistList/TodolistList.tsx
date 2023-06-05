import {useApp} from '../../app/hooks/useApp';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import Paper from '@mui/material/Paper';
import {Todolist} from './Todlist/Todolist';
import React from 'react';

export const TodolistList = () => {
    const {todoLists, addTodoList} = useApp()
    return (
        <Container fixed>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {todoLists.map(el => {
                    return (<Grid item key={el.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    todoInfo={el}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}