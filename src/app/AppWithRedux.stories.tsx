import type { Meta, StoryObj } from "@storybook/react";
import App from "./App";
import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "bll/state";
import { initializeAppTC } from "features/Login/auth-reducer";
import CircularProgress from "@mui/material/CircularProgress";
import { ErrorSnackbar } from "components/ErrorSnackBar/ErrorSnackBar";
import { Header } from "features/Header/Header";
import { Route, Routes } from "react-router-dom";
import { TodolistList } from "features/TodolistList/TodolistList";
import { Login } from "features/Login/Login";

const meta: Meta<typeof App> = {
    title: "TodoLists/AppWithRedux",
    component: App,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
};

export default meta;

type Story = StoryObj<typeof App>;

const AppWithRedux = () => {
    const isInitialized = useAppSelector((state) => state.auth.isInitialized);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAppTC());
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
                <Route path="/*" element={<TodolistList />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
};

export const AppWithReduxStory: Story = {
    render: () => <AppWithRedux />,
};
