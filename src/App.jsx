import { Routes, Route, BrowserRouter } from "react-router-dom";
import RequireAuth from './components/auth/RequireAuth'

import MainPage from './pages/MainPage'
import LoginPage from "./pages/LoginPage";
import RegistrationPage from './pages/RegistrationPage'
import DashboardPage from './pages/DashboardsPage'
import AdminPage from './pages/AdminPage'
import CreatorPage from './pages/CreatorPage'
import WorkspacePage from './pages/WorkspacePage'
import NotFound from './pages/NotFound'
import InventoryPage from './pages/InventoryPage'
//import "bootstrap/dist/css/bootstrap.min.css";
import CssBaseline from '@mui/material/CssBaseline';

function App() {
	// const fetchData = async () => {
	// 	try {
	// 		const response = await fetch(`http://inventory-server-two.vercel.app/api/users`, {
	// 		//const response = await fetch(`http://localhost:3001/api/users`, {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({
	// 				user: "user",
	// 			}),
	// 		});
	// 		console.log(await response.json());
	// 		return;
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	fetchData();
	return (

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

	)
}

export default App;
