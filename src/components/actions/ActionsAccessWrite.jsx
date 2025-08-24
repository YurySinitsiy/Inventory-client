import { Box, Button } from "@mui/material";
import updateAccessWrite from "../services/updateAccessWrite"
import { useUserData } from "../services/hooks/useUserData";
import Loader from "../tools/Loader"
import { useState } from 'react'
const ActionsAccessWrite = ({ selectedIds, inventoryId, loading, fetchUsersAccess, setSelectedIds }) => {
    const [updating, setUpdating] = useState(false);

    if (!inventoryId) return null;

    const updateAccess = async (giveAccess) => {
        setUpdating(true);
        try {
            await updateAccessWrite(giveAccess, inventoryId, selectedIds);
            setSelectedIds([]);
            await fetchUsersAccess(inventoryId);
        } catch (error) {
            console.error(error)
        } finally {
            setUpdating(false);
        }
    };
    if (loading || updating) return <Loader />

    return (
        <Box sx={{ display: "flex", gap: 1 }}>
            <Button
                variant="outlined"
                sx={{ my: 1 }}
                disabled={!selectedIds.length}
                color="success"
                onClick={() => updateAccess(true)}
            >
                Give access
            </Button>
            <Button
                variant="outlined"
                sx={{ my: 1 }}
                disabled={!selectedIds.length}
                color="error"
                onClick={() => updateAccess(false)}
            >
                Remove access
            </Button>
        </Box>
    );
};

export default ActionsAccessWrite;
