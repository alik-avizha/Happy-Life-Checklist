import { AxiosResponse } from "axios";
import { instance } from "common/api/common.api";
import { ResponseType } from "common/types";

//api
export const authAPI = {
    me() {
        return instance.get<ResponseType<{ id: number; email: string; login: string }>>(`auth/me`);
    },
    login(data: LoginDataType) {
        return instance.post<
            ResponseType<{ userId: number }>,
            AxiosResponse<ResponseType<{ userId: number }>>,
            LoginDataType
        >(`auth/login`, data);
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`);
    },
    getCaptchaUrl() {
        return instance.get<{ url: string }>(`security/get-captcha-url`);
    },
};
//typing
export type LoginDataType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
};
