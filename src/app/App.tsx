import React, { useEffect } from "react";
import "./App.css";
import { Header } from "features/Header/Header";
import { TodolistList } from "features/TodolistList/TodolistList";
import { ErrorSnackbar } from "common/components/errorSnackBar/ErrorSnackBar";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "features/Login/Login";
import CircularProgress from "@mui/material/CircularProgress";
import { authThunks } from "features/Login/auth-reducer";
import { useActions } from "common/hooks/useActions";
import { useSelector } from "react-redux";
import { selectSsInitialized } from "features/Login/auth.selectors";

export function App() {
    const isInitialized = useSelector(selectSsInitialized);
    const { initializeApp } = useActions(authThunks);

    useEffect(() => {
        initializeApp();
    });

    if (!isInitialized) {
        return (
            <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="App">
            <ErrorSnackbar />
            <Header />
            <Routes>
                <Route path="/" element={<TodolistList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
                <Route path="*" element={<Navigate to={"/404"} />} />
            </Routes>
        </div>
    );
}

export default App;
