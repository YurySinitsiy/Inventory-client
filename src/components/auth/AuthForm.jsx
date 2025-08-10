import { useState } from "react";
import { Formik, Form } from "formik";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Title from "../Title";

const AuthForm = ({ title, fields, validationSchema, initialValues, onSubmit, submitText }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(prev => !prev);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form >
          <Box sx={{ backgroundColor: "white", p: 3, borderRadius: "20px", maxWidth: '600px' }}>
            <Title variant="h5">{title}</Title>

            {fields.map(({ name, label, type }) => (
              <TextField
                key={name}
                fullWidth
                margin="normal"
                label={label}
                name={name}
                type={type === "password" ? (showPassword ? "text" : "password") : type}
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched[name] && Boolean(errors[name])}
                helperText={touched[name] && errors[name]}
                InputProps={
                  type === "password"
                    ? {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePassword} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }
                    : {}
                }
              />
            ))}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 3, py: 1.5 }}
              disabled={isSubmitting}
            >
              {submitText}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
