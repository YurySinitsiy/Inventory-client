import AppBox from "../components/AppBox";
import RegForm from '../components/auth/RegForm'
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Typography, Link, Alert, } from "@mui/material";
import { supabase } from "../lib/supabaseClient";
import { useState } from 'react'

const RenderRegistrationPage = () => {
    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handlesubmit = async (values) => {
        setError(null);
        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                    data: {
                        name: values.name,
                        surname: values.surname,
                    },
                },
            });
            if (authError) throw authError;

            const { error: dbError } = await supabase.from("profiles").insert([
                {
                    id: authData.user.id,
                    email: values.email,
                    name: values.name,
                    surname: values.surname,
                    role: 'user',
                    status: 'unblocked',
                },
            ]);

            if (dbError) throw dbError;
            setSuccess(true);
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <AppBox>
            <Box sx={{
                display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '100%'
            }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        Registration successful! Redirecting...
                    </Alert>
                )}
                <RegForm
                    onSubmit={handlesubmit} />
                <Box textAlign="center" mt={3}>
                    <Typography variant="body2">
                        Do you have an account? {" "}
                        <Link component={RouterLink} to="/login" underline="hover" fontWeight="bold">
                            Sign In
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </AppBox>
    )
}

export default RenderRegistrationPage