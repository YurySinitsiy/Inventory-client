function App() {
	const fetchData = async () => {
		try {
			const response = await fetch(`https://inventory-server-two.vercel.app/api/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user: "user",
				}),
			});
      console.log(await response.json())
			return 
		} catch (error) {
			console.error(error);
		}
	};
  
  fetchData();
	return <></>;
}

export default App;
