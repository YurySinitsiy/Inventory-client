const getInventory = async (id) => {
	try {
		const res = await fetch(`http://inventory-server-two.vercel.app/api/inventory/${id}`, {
		//const res = await fetch(`http://localhost:3001/api/inventory/${id}`, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}));
			throw new Error(`Server error: ${errorData.message || res.statusText}`);
		}
		return await res.json();
	} catch (error) {
		console.error(error.message);
		throw error;
	}
};

export default getInventory;
