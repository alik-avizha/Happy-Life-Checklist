import React, {memo} from 'react';
import TextField from '@mui/material/TextField';
import {AddBox} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import {useAddItemForm} from './hooks/useAddItemForm';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {

    const {title, error, addTaskHandler, onChangeTaskHandler, onKeyDownHandler} = useAddItemForm(props.addItem)

    return (
            <div>
                <TextField  variant="outlined" value={title} onChange={onChangeTaskHandler} onKeyDown={onKeyDownHandler}
                            error={!!error} label="Enter your task" helperText={error}/>
                <IconButton color='primary' onClick={addTaskHandler} > <AddBox/></IconButton>
            </div>
    );
})
