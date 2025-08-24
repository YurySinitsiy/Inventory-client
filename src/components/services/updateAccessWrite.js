const API_URL = import.meta.env.VITE_API_URL;

const updateAccessWrite = async (giveAccess, inventoryId, selectedIds) => {
	try {
		const users = selectedIds.map((id) => ({
			userId: id,
			hasAccess: giveAccess,
		}));

		const response = await fetch(
			`${API_URL}/api/users/${inventoryId}/users-access/bulk`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ users }), 
			}
		);

		if (!response.ok) throw new Error(`Request error: ${response.status}`);

		return await response.json(); 
	} catch (err) {
		console.error("Error updating access", err);
	}
};

export default updateAccessWrite;
