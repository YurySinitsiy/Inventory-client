import { Button, Box } from '@mui/material';
import AddInventoryModal from '../inventory/AddInventoryModal';
import { useState } from 'react';
const AddInventoryButton = ({ setUserInventories, showSnackbar, t }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Box>
      <Button
        sx={{ my: 1, mr: 1 }}
        variant='outlined'
        onClick={() => setOpenModal(true)}>
        {t('inventory.add')}
      </Button>
      {openModal && (
        <AddInventoryModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          t={t}
          onAdd={(newInventory) => {
            if (!newInventory) return;
            setUserInventories((prev) => [...prev, newInventory]);
            showSnackbar(t('inventory.added'), 'success');
          }}
        />
      )}
    </Box>
  );
};

export default AddInventoryButton;
