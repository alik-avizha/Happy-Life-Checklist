import { ChangeEvent, useState, KeyboardEvent } from "react";

export const useEditableSpan = (newTitle: string, onChange: (title: string) => void, disabled: boolean) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(newTitle);

    const activateEditMode = () => {
        if (disabled) {
            return;
        }
        setTitle(newTitle);
        setEditMode(true);
    };
    const activateViewMode = () => {
        setEditMode(false);
        onChange(title);
    };

    const onEnterPressed = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && activateViewMode()
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    return { editMode, title, activateEditMode, activateViewMode, onChangeHandler, onEnterPressed };
};
