import { supabase } from "../../../lib/supabaseClient";
import { useState, useEffect } from "react";

export const useUserData = () => {
	const [user, setUser] = useState(null);
	const [userName, setUserName] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			const { data: { user } } = await supabase.auth.getUser();
			setUser(user || null);
			setUserName(user?.user_metadata?.name || '');
			setLoading(false);


		};
		fetchUser();
	}, []);


	return {
		user,
		userName,
		loading
	};
};
