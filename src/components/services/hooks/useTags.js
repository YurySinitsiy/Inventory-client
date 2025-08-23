import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export const useTags = (query = "") => {
	const [tags, setTags] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTags = async () => {
			setLoading(true);

			try {
				const res = await fetch(
					`${API_URL}/api/tags?query=${encodeURIComponent(query)}`
				);
				if (!res.ok) {
					throw new Error(`Ошибка: ${res.status}`);
				}
				const data = await res.json();
				setTags(data || []);
			} catch (err) {
				console.error("Tags download error:", err);
				setTags([]);
			} finally {
				setLoading(false);
			}
		};

		fetchTags();
	}, [query]);

	return { tags, loading };
};
