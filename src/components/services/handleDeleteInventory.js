import { getSession } from "./getSession";
const API_URL = import.meta.env.VITE_API_URL;

const handleDeleteInventory = async (selectedIds) => {
	try {
		const session = await getSession();
		const res = await fetch(`${API_URL}/api/inventories`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session.access_token}`,
			},
			body: JSON.stringify({ ids: selectedIds }),
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(`Server error: ${errorData.message || res.statusText}`);
		}

		return true;
	} catch (error) {
		console.error(error.message);
		throw error;
	}
};

export default handleDeleteInventory;
