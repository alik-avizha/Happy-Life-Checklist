import React, { useEffect } from "react";
import "app/app.css";
import { Header } from "features/header/ui/header";
import { ErrorSnackBar } from "common/components/error-snack-bar/error-snack-bar";
import { Navigate, Route, Routes } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { authThunks } from "features/auth/model/auth.reducer";
import { useActions } from "common/hooks/use-actions";
import { useSelector } from "react-redux";
import { selectSsInitialized } from "features/auth/model/auth.selectors";
import { TodolistList } from "features/todolist-list/todolist-list";
import { Login } from "features/auth/ui/login/login";

export function App() {
    const isInitialized = useSelector(selectSsInitialized);
    const { initializeApp } = useActions(authThunks);

    useEffect(() => {
        initializeApp({});
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
            <ErrorSnackBar />
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
