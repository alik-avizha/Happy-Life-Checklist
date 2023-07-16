import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { selectAppStatus } from "app/model/app.selectors";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { useActions } from "common/hooks";
import { authThunks } from "features/auth/model/auth.reducer";

export const Header = () => {
    const status = useSelector(selectAppStatus);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { logout } = useActions(authThunks);

    const logoutHandler = () => {
        logout({});
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
