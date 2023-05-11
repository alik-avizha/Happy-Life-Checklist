import React, {ChangeEvent, memo, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {


    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField value={title} autoFocus onBlur={activateViewMode} onChange={onChangeHandler} />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    );
});
