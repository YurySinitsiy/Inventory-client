import { Box, Paper } from "@mui/material";
import Loader from "../tools/Loader";
import { useInventories } from "../services/hooks/useInventories";
import ActionsInventory from "../actions/ActionsInventory";
import InventoryTable from "../table/InventoryTable";
import SnackbarAlert from "../tools/Snackbar";
import { useSnackbar } from "../services/hooks/useSnackbar";
const RenderUserInventory = () => {
    const {
        userInventories, selectedIds, setSelectedIds,
        setUserInventories, isLoading, error, message,
        setError, setMessage, deleteSelected
    } = useInventories();

    const { snackbar, showSnackbar, closeSnackbar } = useSnackbar()

    if (isLoading) return <Loader />;
    if (message) {
        showSnackbar(message, "success");
        setMessage(null);
    }

    if (error) {
        showSnackbar(error, "error");
        setError(null);
    }

    return (
        <Box>
            <SnackbarAlert snackbar={snackbar} closeSnackbar={closeSnackbar} />
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