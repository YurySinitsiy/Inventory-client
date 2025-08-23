import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from 'react'
import RequireAuth from './components/auth/RequireAuth'
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import MainPage from './pages/MainPage'
import LoginPage from "./pages/LoginPage";
import RegistrationPage from './pages/RegistrationPage'
import DashboardPage from './pages/DashboardsPage'
import AdminPage from './pages/AdminPage'
import CreatorPage from './pages/CreatorPage'
import WorkspacePage from './pages/WorkspacePage'
import NotFound from './pages/NotFound'
import InventoryPage from './pages/InventoryPage'
import { useContext } from "react";
import { ThemeProviderWrapper, ThemeContext } from "./components/tools/ThemeContext";
const API_URL = import.meta.env.VITE_API_URL;

function AppContent() {
	const { darkMode } = useContext(ThemeContext);

	const theme = createTheme({
		palette: { mode: darkMode ? "dark" : "light" },
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<BrowserRouter>
					<Routes>
						{/* Доступ для всех */}
						<Route path="/" element={<MainPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<RegistrationPage />} />
						<Route path="/inventory/:id" element={<InventoryPage />} />
						{/* Только user, admin, creator, write */}
						<Route
							path="/dashboard"
							element={
								<RequireAuth allowedRoles={["user", "admin", "creator", "write"]}>
									<DashboardPage />
								</RequireAuth>
							}
						/>

						{/* Только admin */}
						<Route
							path="/admin"
							element={
								<RequireAuth allowedRoles={["admin"]}>
									<AdminPage />
								</RequireAuth>
							}
						/>

						{/* Только editor */}
						<Route
							path="/creator"
							element={
								<RequireAuth allowedRoles={["creator", "admin"]}>
									<CreatorPage />
								</RequireAuth>
							}
						/>

						{/* Только write */}
						<Route
							path="/workspace"
							element={
								<RequireAuth allowedRoles={["write", "admin"]}>
									<WorkspacePage />
								</RequireAuth>
							}
						/>

						{/* 404 */}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</CssBaseline>
		</ThemeProvider>
	);
}

function App() {
	const fetchData = async () => {
		try {
			const response = await fetch(`${API_URL}/api/users`, {
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
		<ThemeProviderWrapper>
			<AppContent />
		</ThemeProviderWrapper>
	);
}

export default App;
