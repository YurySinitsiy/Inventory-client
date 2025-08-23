import { getSession } from "./getSession";
const API_URL = import.meta.env.VITE_API_URL;

const handleAddInventory = async (values) => {
	try {
		const session = await getSession();
		const userId = session.user.id;
		console.log(
			JSON.stringify({
				title: values.title,
				description: values.description,
				category: values.category,
				tags: values.tags,
				imageUrl: values.imageUrl,
				ownerId: userId,
				customIdFormat: {},
				fields: {},
				isPublic: Boolean(values.isPublic),
			})
		);
		const res = await fetch(`${API_URL}/api/inventories`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session.access_token}`,
			},
			body: JSON.stringify({
				title: values.title,
				description: values.description,
				tags: values.tags,
				category: values.category,
				imageUrl: values.imageUrl,
				ownerId: userId,
				customIdFormat: {},
				fields: {},
				isPublic: Boolean(values.isPublic),
			}),
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

export default handleAddInventory;
