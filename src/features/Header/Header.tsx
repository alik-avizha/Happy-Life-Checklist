import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppDispatch, useAppSelector } from "bll/state";
import { logoutTC } from "../Login/auth-reducer";

export const Header = () => {
    const status = useAppSelector((state) => state.app.status);
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        dispatch(logoutTC());
    };
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Todolist
                </Typography>
                {isLoggedIn && (
                    <Button color="inherit" onClick={logoutHandler}>
                        Log out
                    </Button>
                )}
            </Toolbar>
            {status === "loading" && <LinearProgress />}
        </AppBar>
    );
};
