import { useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import Loader from "../tools/Loader"
const OAuthRedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserProfile = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session?.user) return navigate("/login");

            const userId = session.user.id;

            // проверяем профиль
            const { data, error } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", userId);

            let role = "user";

            if (!data || data.length === 0) {
                // создаём или обновляем профиль
                await supabase.from("profiles").upsert({ id: userId, role });
            } else {
                role = data[0].role;
            }

            // редирект по роли
            if (role === "admin") navigate("/admin");
            else navigate("/personal");
        };

        checkUserProfile();
    }, []);

    return <Loader/>;
};

export default OAuthRedirectHandler;
