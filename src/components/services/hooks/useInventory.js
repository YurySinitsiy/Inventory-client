import { useState, useEffect } from "react";

import  getInventory  from "../getInventory.js";

export const useInventory = (id) => {
	const [inventory, setInventory] = useState([]);
	const [isloading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);

	const fetchInventory = async () => {
		if (!id) return;
		setIsLoading(true);
		try {
			const data = await getInventory(id);
			setInventory(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchInventory();
	}, [id]);

	return {
		inventory,
		setInventory,
		isloading,
		error,
		message,
		setError,
		setMessage,
	};
};
