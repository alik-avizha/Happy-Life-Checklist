import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { appActions } from "app/model/app.slice";
import { useSelector } from "react-redux";
import { selectAppError } from "app/model/app.selectors";
import { useActions } from "common/hooks";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackBar() {
    const error = useSelector(selectAppError);
    const { setAppError } = useActions(appActions);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setAppError({ error: null });
    };
    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                {error}
            </Alert>
        </Snackbar>
    );
}
