import axios from "axios";

//settings
export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
});

//typing
type FieldErrorType = {
    error: string;
    field: string;
};

export type ResponseType<T = {}> = {
    resultCode: number;
    messages: string[];
    fieldsErrors: FieldErrorType[];
    data: {
        item: T;
    };
};

export const ResultCode = {
    success: 0,
    error: 1,
    captcha: 10,
} as const;
