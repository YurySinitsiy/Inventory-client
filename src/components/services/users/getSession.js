import { supabase } from "../../../lib/supabaseClient";

export const getSession = async () => {
	try {
		const {
			data: { session },
		} = await supabase.auth.getSession();
		return session;
	} catch (error) {
		console.error(error);
		throw new Error("Session error");
	}
};
