import AppBox from "../components/tools/AppBox";
import { supabase } from "../lib/supabaseClient";

const renderAdminPage = () => {

    const handleAddInventory = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('User not authentificated')

            const userId = session.user.id
            const res = await fetch("https://inventory-server-two.vercel.app/api/inventory", {
            //const res = await fetch("http://localhost:3001/api/inventory", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    title: 'New Inventory',
                    description: "descr",
                    category: "tehno",
                    ownerId: userId,
                    customIdFormat: {},
                    fields: {}
                })
            })

            const data = await res.json()
            console.log("Inventory создан:", data);
        } catch (error) {
            console.error(error)
        }




        console.log('inventory add')
    }
    return (
        <AppBox>
            <button onClick={handleAddInventory}>add inventory</button>
        </AppBox>
    )
}

export default renderAdminPage