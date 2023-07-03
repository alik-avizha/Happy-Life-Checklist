import React, { memo } from "react";
import TextField from "@mui/material/TextField";
import { AddBox } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useAddItemForm } from "common/components/addItemForm/hooks/useAddItemForm";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
    disabled?: boolean;
};

export const AddItemForm = memo((props: AddItemFormPropsType) => {
    const { title, error, addTaskHandler, onChangeTaskHandler, onKeyDownHandler } = useAddItemForm(props.addItem);

    return (
        <div>
            <TextField
                variant="outlined"
                value={title}
                onChange={onChangeTaskHandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                label="Enter your task"
                helperText={error}
                disabled={props.disabled}
            />
            <IconButton color="primary" onClick={addTaskHandler} disabled={props.disabled}>
                {" "}
                <AddBox />
            </IconButton>
        </div>
    );
});
