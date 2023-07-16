import React, { useEffect } from "react";
import s from "app/app.module.css";
import { Header } from "features/header/ui/header";
import { ErrorSnackBar } from "common/components/error-snack-bar/error-snack-bar";
import CircularProgress from "@mui/material/CircularProgress";
import { authThunks } from "features/routing/auth/model/auth.slice";
import { useActions } from "common/hooks/use-actions";
import { useSelector } from "react-redux";
import { selectIsInitialized } from "features/routing/auth/model/auth.selectors";
import { Routing } from "features/routing/routing";

export function App() {
    const isInitialized = useSelector(selectIsInitialized);
    const { initializeApp } = useActions(authThunks);

    useEffect(() => {
        initializeApp({});
    });

    if (!isInitialized) {
        return (
            <div className={s.app}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="App">
            <ErrorSnackBar />
            <Header />
            <Routing />
        </div>
    );
}

export default App;
