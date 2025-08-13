import AppBox from "../components/AppBox";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Title from "../components/Title";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Link, Alert } from "@mui/material";
import LoginForm from '../components/auth/LoginForm'
import { supabase } from "../lib/supabaseClient";
import CheckUserStatus from '../components/auth/CheckUserStatus'
import CheckUserRole from '../components/auth/CheckUserRole'
import RedirectByRole from '../components/auth/RedirectByRole.js'
import { useNavigate } from "react-router-dom";


const RenderLoginPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const handleSubmit = async (values, { resetForm }) => {
		setError(null)
		setIsLoading(true)
		try {
			const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
				email: values.email,
				password: values.password
			})

			if (authError) throw authError;

			const isUserValid = await CheckUserStatus(user.id)
			if (!isUserValid) {
				throw new Error('Your account is blocked or delete')
			}
			resetForm();

			RedirectByRole(await CheckUserRole(user.id), navigate)

		} catch (error) {
			setError(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	if (isLoading) return <Loader />

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
				<Title
					variant="h4"
					sx={{ marginBottom: "30px", fontWeight: '700' }}
				>
					Welcome to Invy!
				</Title>
				<LoginForm
					onSubmit={handleSubmit} />
				<Box textAlign="center" mt={3}>
					<Typography variant="body2">
						Don't have an account?{" "}
						<Link component={RouterLink} to="/signup" underline="hover" fontWeight="bold">
							Sign Up
						</Link>
					</Typography>
				</Box>
			</Box>
		</AppBox>
	);

}

export default RenderLoginPage;
