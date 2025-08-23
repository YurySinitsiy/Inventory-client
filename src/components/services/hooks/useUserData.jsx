import { supabase } from "../../../lib/supabaseClient";
import { useState, useEffect } from "react";

export const useUserData = () => {
	const [user, setUser] = useState(null);
	const [allUsers, setAllUsers] = useState([]);
	const [userName, setUserName] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const { data: { user } } = await supabase.auth.getUser();
				setUser(user);

				setUserName(user?.user_metadata?.name || '');
				if (!user) return
				const { data } = await supabase
					.from("profiles")
					.select("*")
					.order("name", { ascending: true });
				setAllUsers(data || []);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return {
		user,
		userName,
		loading,
		allUsers
	};
};