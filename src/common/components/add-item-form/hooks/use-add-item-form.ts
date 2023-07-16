import { ChangeEvent, KeyboardEvent, useState } from "react";
import { RejectValueType } from "common/utils/create-app-async-thunk";

export const useAddItemForm = (onItemAdded: (title: string) => Promise<any>) => {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string>("");

    const addItemHandler = () => {
        const trimTitle = title.trim();
        if (trimTitle !== "") {
            onItemAdded(trimTitle)
                .then(() => {
                    setTitle("");
                })
                .catch((err: RejectValueType) => {
                    if (err.data) {
                        const messages = err.data.messages;
                        setError(messages.length ? messages[0] : "Some error occurred");
                    }
                });
        } else {
            setError("Error, you have to write Title");
        }
    };
    const onChangeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError("");
    };
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addItemHandler();
    };
    return { title, error, addItemHandler, onChangeItemHandler, onKeyDownHandler };
};
