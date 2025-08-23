import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export const useCategories = (query = "") => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCategories = async () => {
			setLoading(true);
			try {
				const res = await fetch(
					`${API_URL}/api/category?query=${encodeURIComponent(query)}`
				);
				if (!res.ok) {
					throw new Error(`Ошибка: ${res.status}`);
				}
				const data = await res.json();
				setCategories(data || []);
			} catch (err) {
				console.error("Category download error:", err);
				setCategories([]);
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, [query]);

	return { categories, loading };
};
