import { getSession } from "./getSession";
const API_URL = import.meta.env.VITE_API_URL;

const getUsersAccess = async (inventoryId) => {
	const session = await getSession();

	try {
		const response = await fetch(
			`${API_URL}/api/inventories/${inventoryId}/users-access`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session.access_token}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error("Ошибка при получении пользователей с доступом");
		}

		const usersWithAccess = await response.json();
		return usersWithAccess;
	} catch (err) {
		console.error(err);
	}
};

export default getUsersAccess;
