import { getSession } from "./getSession";

const handleDeleteInventory = async (selectedIds) => {
	try {
		const session = await getSession()
		const res = await fetch("https://inventory-server-two.vercel.app/api/inventory", {
			//const res = await fetch("http://localhost:3001/api/inventory", {
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
