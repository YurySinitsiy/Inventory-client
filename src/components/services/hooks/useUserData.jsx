import { supabase } from "../../../lib/supabaseClient";
import { useState, useEffect } from "react";
import getUsersAccess from "../getUsersAccess"

export const useUserData = ({ inventoryId } = {}) => {
	const [user, setUser] = useState(null);
	const [allUsers, setAllUsers] = useState([]);
	const [allUsersAccess, setAllUsersAccess] = useState([]);
	const [userName, setUserName] = useState("");
	const [loading, setLoading] = useState(true);
	const [selectedIds, setSelectedIds] = useState([]);


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

	const fetchUsersAccess = async (inventoryId) => {
		setLoading(true);
		try {
			const data = await getUsersAccess(inventoryId)
			if (!data) return
			setAllUsersAccess(data)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false);

		}

	}

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		fetchUsersAccess(inventoryId)
	}, [inventoryId])

	const handleDeleteUser = async (selectedIds) => {
		setLoading(true)
		console.log(selectedIds)
		const { error } = await supabase.auth.admin.deleteUser(selectedIds);
		if (error) throw error;
		setLoading(false)

	}

	return {
		user,
		userName,
		loading,
		allUsers,
		selectedIds,
		setSelectedIds,
		handleDeleteUser,
		allUsersAccess
	};
};