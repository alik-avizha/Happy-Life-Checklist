import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormikHelpers, useFormik } from "formik";
import { Navigate } from "react-router-dom";
import { authThunks } from "features/routing/auth/model/auth.slice";
import { useSelector } from "react-redux";
import { selectIsCaptcha, selectIsLoggedIn } from "features/routing/auth/model/auth.selectors";
import { useActions } from "common/hooks";
import { LoginDataType } from "features/routing/auth/api/auth.api";
import { ResponseType } from "common/types";

export type FormikErrorType = Partial<Omit<LoginDataType, "captcha">>;

export const Login = () => {
    const { login } = useActions(authThunks);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const captcha = useSelector(selectIsCaptcha);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Email is required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            if (!values.password) {
                errors.password = "Required";
            } else if (values.password.length <= 3) {
                errors.password = "Password should be more than 3 letter";
            }
            return errors;
        },
        onSubmit: (values, formikHelpers: FormikHelpers<LoginDataType>) => {
            login(values)
                .unwrap()
                .then(() => {
                })
                .catch((reason: ResponseType) => {
                    const { fieldsErrors } = reason;
                    if (fieldsErrors) {
                        fieldsErrors.forEach((el) => {
                            formikHelpers.setFieldError(el.field, el.error);
                        });
                    }
                });
        }
    });

    if (isLoggedIn) {
        return <Navigate to={"/"} />;
    }

    return (
        <Grid container justifyContent={"center"}>
            <Grid item justifyContent={"center"}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p style={{ color: "white" }}>
                                To log in get registered{" "}
                                <a href={"https://social-network.samuraijs.com/"} target={"_blank"}
                                   style={{ color: "white" }}>
                                    here
                                </a>
                            </p>
                            <p style={{ color: "white" }}>or use common test account credentials:</p>
                            <p style={{ color: "white" }}>Email: free@samuraijs.com</p>
                            <p style={{ color: "white" }}>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderColor: "white"
                                },
                                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white"
                                },
                                "& input": {
                                    color: "white"
                                },
                                "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                                    color: "white"
                                }
                            }} />
                            {formik.touched.email && formik.errors.email && (
                                <div style={{ color: "red" }}>{formik.errors.email}</div>
                            )}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps("password")}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderColor: "white",
                                        "& input": {
                                            color: "white"
                                        },
                                    },
                                    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                                        color: "white"
                                    },
                                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "white"
                                    }
                                }}
                            />
                            {formik.touched.password && <div style={{ color: "red" }}>{formik.errors.password}</div>}
                            <FormControlLabel
                                label={"Remember me"}
                                control={
                                    <Checkbox
                                        checked={formik.values.rememberMe}
                                        {...formik.getFieldProps("rememberMe")}
                                    />
                                }
                            />
                            {captcha && (
                                <>
                                    <TextField
                                        label="enter captcha"
                                        margin="normal"
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderColor: "white"
                                            },
                                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "white"
                                            },
                                            "& input": {
                                                color: "white"
                                            }
                                        }}
                                        {...formik.getFieldProps("captcha")}
                                    />
                                    <img src={`${captcha}`} alt="captcha img" />
                                </>
                            )}
                            <Button
                                disabled={!(formik.isValid && formik.dirty)}
                                type={"submit"}
                                variant={"contained"}
                                color={"secondary"}
                            >
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};
