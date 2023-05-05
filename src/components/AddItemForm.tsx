import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import {AddBox} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('')

    const addTaskHandler = () => {
        const trimTitle = title.trim()
        if (trimTitle !== '') {
            props.addItem(trimTitle)
            setTitle('')
        } else {
            setError('Error, you have to write Title')
        }
    }
    const onChangeTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTaskHandler()
    }

    return (
            <div>
                <TextField  variant="outlined" value={title} onChange={onChangeTaskHandler} onKeyDown={onKeyDownHandler}
                            error={!!error} label="Enter your task" helperText={error}/>
                <IconButton color='primary' onClick={addTaskHandler} > <AddBox/></IconButton>
            </div>
    );
};
