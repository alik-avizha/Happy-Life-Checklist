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
                style={{ width: "230px" }}

                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderColor: "white"
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white"
                    },
                    "& input": {
                        color: "white"
                    },
                    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                        color: "white"
                    }
                }}
            />
            <IconButton
                aria-label={"add-item"}
                color="primary"
                onClick={addItemHandler}
                disabled={props.disabled}
                style={{ marginLeft: "5px", color: "white" }}
            >
                <AddBox />
            </IconButton>
        </div>
    );
});
