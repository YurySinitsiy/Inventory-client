import { useState, useEffect } from "react";
import handleDeleteInventory from "../handleDeleteInventory";
import getInventories from "../getInventories";
import getUserInventories from "../getUserInventories";

export const useInventories = () => {
	const [inventories, setInventories] = useState([]);
	const [userInventories, setUserInventories] = useState([]);
	const [selectedIds, setSelectedIds] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);

	const fetchInventories = async () => {
		setIsLoading(true);
		try {
			const data = await getInventories();
			setInventories(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	const fetchUserInventories = async () => {
		setIsLoading(true);
		try {
			const data = await getUserInventories();
			setUserInventories(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	const deleteSelected = async () => {
		setIsLoading(true);
		try {
			await handleDeleteInventory(selectedIds);
			//userInventories.filter((row) => !selectedIds.includes(row.id))
			setSelectedIds([]);
			setMessage("Inventory deleted!");
			await fetchUserInventories()
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchInventories();
		fetchUserInventories();
	}, []);

	return {
		inventories,
		setInventories,
		userInventories,
		setUserInventories,
		selectedIds,
		setSelectedIds,
		isLoading,
		error,
		message,
		setError,
		setMessage,
		deleteSelected,
	};
};
