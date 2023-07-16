import React, { memo } from "react";
import TextField from "@mui/material/TextField";
import { useEditableSpan } from "common/components/editable-span/hooks/use-editable-span";

type PropsType = {
    title: string;
    onChange: (newTitle: string) => void;
    disabled: boolean;
};

export const EditableSpan = memo((props: PropsType) => {
    const { editMode, title, activateEditMode, activateViewMode, onChangeHandler } = useEditableSpan(
        props.title,
        props.onChange,
        props.disabled
    );

    return editMode ? (
        <TextField value={title} autoFocus onBlur={activateViewMode} onChange={onChangeHandler} />
    ) : (
        <span onDoubleClick={activateEditMode}>{props.title}</span>
    );
});
