import { Box, Paper } from "@mui/material";
import Loader from "../tools/Loader";
import { useInventories } from "../services/hooks/useInventories";
import ActionsInventory from "../inventory/ActionsInventory";
import InventoryTable from "../table/InventoryTable";
import Snackbar from "../tools/Snackbar";

const RenderUserInventory = () => {
    const {
        userInventories, selectedIds, setSelectedIds,
        setUserInventories, isLoading, error, message, setError, setMessage, deleteSelected, addInventory
    } = useInventories();

    if (isLoading) return <Loader />;

    return (
        <Box>
            <Snackbar
                open={!!message || !!error}
                message={message || error}
                severity={message ? 'success' : 'error'}
                onClose={() => { setError(null); setMessage(null); }}
            />
            <ActionsInventory
                selectedIds={selectedIds}
                onDelete={deleteSelected}
                onAdd={(newInventory) => {
                    if (!newInventory) return;
                    setUserInventories(prev => [...prev, newInventory]);
                    setMessage('Inventory added!');
                }}
            />
            <Paper sx={{ height: 400, width: '100%' }}>
                <InventoryTable
                    inventories={userInventories}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                />
            </Paper>
        </Box>
    );
};

export default RenderUserInventory;