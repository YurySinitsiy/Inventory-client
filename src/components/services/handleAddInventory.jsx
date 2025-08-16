import { getSession } from "./getSession";

const handleAddInventory = async (values) => {
	try {
		const session = await getSession()
		const userId = session.user.id;
		// console.log(
		// 	JSON.stringify({
		// 		title: values.title,
		// 		description: values.description,
		// 		category: values.category,
		// 		ownerId: userId,
		// 		customIdFormat: {},
		// 		fields: {},
		// 		isPublic: values.public,
		// 	})
		// );
		const res = await fetch("http://inventory-server-two.vercel.app/api/inventory", {
			//const res = await fetch("http://localhost:3001/api/inventory", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session.access_token}`,
			},
			body: JSON.stringify({
				title: values.title,
				description: values.description,
				category: values.category,
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
