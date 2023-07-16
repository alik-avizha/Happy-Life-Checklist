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
