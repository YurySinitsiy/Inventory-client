import { Box, Button } from "@mui/material";
import AddInventory from "./AddInventory";
import { useState } from 'react'

const ActionsInventory = ({ selectedIds, onDelete, onAdd }) => {
    const [openAddModal, setOpenAddModal] = useState(false);

    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
                sx={{ backgroundColor: 'white', my: 1 }}
                variant="outlined"
                onClick={() => setOpenAddModal(true)}
            >
                Добавить инвентарь
            </Button>
            <AddInventory
                open={openAddModal}
                onClose={() => setOpenAddModal(false)}
                onAdd={onAdd}
            />
            <Button
                variant="contained"
                color="error"
                sx={{ my: 1 }}
                disabled={!selectedIds.length}
                onClick={onDelete}
            >
                Удалить выбранное
            </Button>
        </Box>
    );
};

export default ActionsInventory;