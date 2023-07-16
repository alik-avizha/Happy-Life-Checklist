import { ChangeEvent, KeyboardEvent, useState } from "react";

export const useAddItemForm = (onItemAdded: (title: string) => void) => {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string>("");

    const addTaskHandler = () => {
        const trimTitle = title.trim();
        if (trimTitle !== "") {
            onItemAdded(trimTitle);
            setTitle("");
        } else {
            setError("Error, you have to write Title");
        }
    };
    const onChangeTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError("");
    };
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addTaskHandler();
    };
    return { title, error, addTaskHandler, onChangeTaskHandler, onKeyDownHandler };
};
