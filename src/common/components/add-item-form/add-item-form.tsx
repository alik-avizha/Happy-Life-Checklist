import React, { memo } from "react";
import TextField from "@mui/material/TextField";
import { AddBox } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useAddItemForm } from "common/components/add-item-form/hooks/use-add-item-form";

type PropsType = {
    addItem: (title: string) => Promise<any>;
    disabled?: boolean;
};

export const AddItemForm = memo((props: PropsType) => {
    const { title, error, addItemHandler, onChangeItemHandler, onKeyDownHandler } = useAddItemForm(props.addItem);

    return (
        <div>
            <TextField
                variant="outlined"
                value={title}
                onChange={onChangeItemHandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                label="Enter your task"
                helperText={error}
                disabled={props.disabled}
            />
            <IconButton color="primary" onClick={addItemHandler} disabled={props.disabled}>
                {" "}
                <AddBox />
            </IconButton>
        </div>
    );
});
