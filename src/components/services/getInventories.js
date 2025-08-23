const API_URL = import.meta.env.VITE_API_URL;

const getInventories = async () => {
	try {
		const res = await fetch(`${API_URL}/api/all-inventories`, {
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

export default getInventories;
