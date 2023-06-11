import React from 'react';
import './App.css';
import {Header} from '../features/Header/Header';
import {TodolistList} from '../features/TodolistList/TodolistList';
import {ErrorSnackbar} from '../components/ErrorSnackBar/ErrorSnackBar';

export function App() {
    return (
        <div className="App">
            <ErrorSnackbar/>
            <Header/>
            <TodolistList/>
        </div>
    );
}
export default App;
