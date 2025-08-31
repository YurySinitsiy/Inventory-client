import { Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddInventory from '../inventory/AddInventoryModal';
import { useState } from 'react';
const AddInventoryButton = ({ setUserInventories, setMessage }) => {
  const { t } = useTranslation();
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
        <AddInventory
          open={openModal}
          onClose={() => setOpenModal(false)}
          onAdd={(newInventory) => {
            if (!newInventory) return;
            setUserInventories((prev) => [...prev, newInventory]);
            setMessage(t('inventory.added'), 'success');
          }}
        />
      )}
    </Box>
  );
};

export default AddInventoryButton;
