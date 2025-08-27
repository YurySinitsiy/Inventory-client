import { Box, Button } from '@mui/material';
import AddInventory from '../inventory/AddInventory';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ActionsInventory = ({ selectedIds, onDelete, onAdd }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button
        sx={{ my: 1 }}
        variant='outlined'
        onClick={() => setOpenAddModal(true)}>
        {t('inventory.add')}
      </Button>
      <AddInventory
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAdd={onAdd}
      />
      <Button
        variant='outlined'
        color='error'
        sx={{ my: 1 }}
        disabled={!selectedIds.length}
        onClick={onDelete}>
        {t('inventory.delete')}
      </Button>
    </Box>
  );
};

export default ActionsInventory;
