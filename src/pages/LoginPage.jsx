import AppBox from "../components/AppBox";
import { useState } from "react";
import Loader from "../components/Loader";
import Title from "../components/Title";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Link, } from "@mui/material";
import LoginForm from '../components/auth/LoginForm'

const RenderLoginPage = () => {
	const [isLoading, setIsLoading] = useState(false);


	const handleSubmit = (values, { resetForm }) => {
		console.log("Отправка данных:", values);
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(true)
			setIsLoading(false)
			resetForm();
			setIsLoading(false)
		}, 1000);
	}

	if (isLoading) {
		return (
			<AppBox>
				<Loader />
			</AppBox>
		);
	}

	return (
		<AppBox>
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
		</AppBox>
	);
};

export default RenderLoginPage;
