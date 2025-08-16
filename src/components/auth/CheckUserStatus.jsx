import { supabase } from "../../lib/supabaseClient"

const CheckUserStatus = async (userId) => {
    const { data: user, error } = await supabase
        .from('profiles')
        .select('id, status')
        .eq('id', userId)
        .single();
    if (error || !user || user.userstatus === 'blocked') {
        await supabase.auth.signOut();
        return false
    }

    return true
}

export default CheckUserStatus