import React from 'react';
import './App.css';
import {Header} from '../features/Header/Header';
import {TodolistList} from '../features/TodolistList/TodolistList';


export function App() {
    return (
        <div className="App">
            <Header/>
            <TodolistList/>
        </div>
    );
}

export default App;
