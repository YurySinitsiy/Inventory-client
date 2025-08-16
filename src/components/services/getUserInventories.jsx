import { getSession } from "./getSession";

const getUserInventories = async () => {
    try {
        const session = await getSession()
        if (!session) {
            return;
        }
        const res = await fetch("http://inventory-server-two.vercel.app/api/inventory", {
            //const res = await fetch("http://localhost:3001/api/inventory", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.access_token}`,
            },
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(`Server error: ${errorData.message || res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

export default getUserInventories;
