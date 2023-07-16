import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { TodolistList } from "features/routing/todolist-list/todolist-list";
import { Login } from "features/routing/auth/ui/login/login";

export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<TodolistList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
            <Route path="*" element={<Navigate to={"/404"} />} />
        </Routes>
    );
};
