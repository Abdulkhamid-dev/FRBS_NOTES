import React, { useRef, useState } from "react";
import { StyledSign } from "./Style";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Grid, MenuItem, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm, Controller } from "react-hook-form";
import LogoImg from "../../assets/img/logo_1.png";
import { Link } from "react-router-dom";
import { signUp } from "../../service";
import { useAppDispatch } from "../../store/hooks";
import { updateAccount } from "../../store/account/accountSlice";


export interface IUserInfo {
    email: string;
    password: string;
    role?: string;
    fullName?: string;
}
function SignUp() {
    const { handleSubmit, control } = useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch()


    const roleOptions = [
        {
            value: "user",
            label: "User",
        },
        {
            value: "admin",
            label: "Admin",
        },
    ];
    const onSubmit = async (data: any) => {
        setLoading(true)
        const user: any = await signUp(data);
        if (user) {
            dispatch(updateAccount({ role: user.photoURL, userId: user.uid }))
            setLoading(false)
        }
        else {
            setLoading(false)
        }
    }
    return (
        <StyledSign>
            <div className="content">
                <div className="logo">
                    <img src={LogoImg} alt="Logo" loading="lazy" />
                </div>
                <div className="form-block">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container rowSpacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="fullName"
                                    control={control}
                                    defaultValue=""
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            label="Full Name"
                                            variant="outlined"
                                            value={value}
                                            autoComplete="off"
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={error ? error.message : null}
                                        />
                                    )}
                                    rules={{
                                        required: "Full Name required",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            label="Email"
                                            variant="outlined"
                                            value={value}
                                            autoComplete="off"
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={error ? error.message : null}
                                        />
                                    )}
                                    rules={{
                                        required: "Email required",
                                        pattern: {
                                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g,
                                            message: "Email is not valid",
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            label="Password"
                                            variant="outlined"
                                            type="password"
                                            value={value}
                                            autoComplete="off"
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={error ? error.message : null}
                                        />
                                    )}
                                    rules={{
                                        required: "Password required",
                                        minLength: {
                                            value: 5,
                                            message: "Password must be longer 5 character",
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="role"
                                    control={control}
                                    defaultValue=""
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            label="Role"
                                            variant="outlined"
                                            value={value}
                                            select
                                            autoComplete="off"
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={error ? error.message : null}
                                        >
                                            {roleOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                    rules={{
                                        required: "Role required",
                                    }}
                                />
                            </Grid>
                            <Link to='/' className="link">If you have already account?</Link>
                            <Grid item xs={12} sx={{ textAlign: "center" }}>
                                <LoadingButton loading={loading} type="submit" variant="contained" color="primary">
                                    Sign Up
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </StyledSign>
    );
}

export default SignUp;