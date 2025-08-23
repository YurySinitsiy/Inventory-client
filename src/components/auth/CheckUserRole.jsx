import { supabase } from "../../lib/supabaseClient";

const checkUserRole = async (userId) => {
    if (!userId) return null; // защита от пустого id

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching user role:', error);
            return null;
        }

        return data?.role || null; // безопасно возвращаем роль
    } catch (err) {
        console.error('Unexpected error:', err);
        return null;
    }
};

export default checkUserRole;