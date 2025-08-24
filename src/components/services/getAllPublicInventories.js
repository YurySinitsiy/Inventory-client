import { getSession } from "./getSession";

const API_URL = import.meta.env.VITE_API_URL;

const getAllPublicInventories = async () => {
	const session = await getSession();
	if(!session) return
	try {
		const res = await fetch(`${API_URL}/api/public-inventories`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session.access_token}`,
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

export default getAllPublicInventories;
