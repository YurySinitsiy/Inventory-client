import { supabase } from "../../lib/supabaseClient"

const checkUserRole = async (userId) => {
    try {
        const { data } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', userId)
            .single();
        return data.role
    } catch (error) {
        console.error(error)
    }

}

export default checkUserRole