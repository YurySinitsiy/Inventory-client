import AppBox from "../components/AppBox";
import { useState } from "react";
import Loader from "../components/Loader";
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

import AuthForm from '../components/auth/AuthForm'



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
			<Typography
				component="h1"
				variant="h4"
				sx={{ marginBottom: "30px", fontWeight: '700' }}
			>
				Welcome to Invy!
			</Typography>

			<AuthForm
				onSubmit={handleSubmit} />
			<Box textAlign="center" mt={3}>
				<Typography variant="body2">
					Don't have an account?{" "}
					<Link to="/signup" underline="hover" fontWeight="bold">
						Sign Up
					</Link>
				</Typography>
			</Box>
		</AppBox>
	);
};

export default RenderLoginPage;
