import LoginPage from "./pages/LoginPage";
import RegistrationPage from './pages/RegistrationPage'
import "bootstrap/dist/css/bootstrap.min.css";
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
function App() {
	const fetchData = async () => {
		try {
			 const response = await fetch(`https://inventory-server-two.vercel.app/api/users`, {
			//const response = await fetch(`http://localhost:3001/api/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user: "user",
				}),
			});
			console.log(await response.json());
			return;
		} catch (error) {
			console.error(error);
		}
	};

	fetchData();
	return (
		<>
			<CssBaseline>
				<BrowserRouter>
					<Routes>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<RegistrationPage />} />

						<Route path="/" element={<LoginPage />} />

					</Routes>
				</BrowserRouter>
			</CssBaseline>
		</>
	)
}

export default App;
