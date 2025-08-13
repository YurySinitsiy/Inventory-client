import { supabase } from "../../lib/supabaseClient";

const getUser = async () => {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return false;
	}

	return user;
};

export default getUser;
