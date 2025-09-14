import { Button, Box } from '@mui/material';
import AddInventoryModal from '../inventory/AddInventoryModal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AddInventoryButton = ({ setUserInventories, showSnackbar }) => {
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
