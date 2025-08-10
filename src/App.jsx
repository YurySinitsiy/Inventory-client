import LoginPage from "./pages/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";

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
	return <LoginPage />;
}

export default App;
