import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
    Link,
    InputAdornment,
    IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Неверный формат email")
        .required("Обязательное поле"),
    password: Yup.string()
        .min(6, "Минимум 6 символов")
        .required("Обязательное поле"),
});

const RenderAuthForm = ({onSubmit}) => {
    const [showPassword, setShowPassword] = useState(false);


    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };
    return (
        <Formik
            initialValues={{ email: "", password: "", rememberMe: false }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
            }) => (
                <Form>
                    <Box
                        sx={{
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "20px",
                        }}
                    >
                        <Typography
                            component="h2"
                            variant="h5"
                            sx={{ textAlign: "center" }}
                        >
                            Sign in
                        </Typography>

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="rememberMe"
                                        checked={values.rememberMe}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />

                            <Link
                                to="/forgot-password"
                                underline="hover"
                                sx={{ fontSize: "0.875rem" }}
                            >
                                Forgot password?
                            </Link>
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            sx={{ mt: 3, py: 1.5 }}
                            disabled={isSubmitting}
                        >
                            SIGN IN
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

export default RenderAuthForm