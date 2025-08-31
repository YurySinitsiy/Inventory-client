import { Box } from '@mui/material';
import Loader from '../tools/Loader.jsx';
import SnackbarAlert from '../tools/Snackbar.jsx';
import { useSnackbar } from '../services/hooks/useSnackbar.jsx';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import InventoryTable from '../table/InventoryTable.jsx';
import handleDeleteInventory from '../services/handleDeleteInventory.js';

const InventoriesContainer = ({
  inventories,
  actions,
  setSelectionModel,
  selectionModel,
  setUserInventories,
  message,
}) => {
  const { t } = useTranslation();
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (message) {
      showSnackbar(message, 'success');
    }
  }, [message]);

  const deleteSelected = async () => {
    if (!selectionModel.length) return;
    setIsLoading(true);
    try {
      await handleDeleteInventory(selectionModel);
      setUserInventories((prev) =>
        prev.filter((row) => !selectionModel.includes(row.id))
      );
      setSelectionModel([]);
      showSnackbar(t('inventory.deleted'), 'success');
    } catch (err) {
      showSnackbar(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Box>
      <SnackbarAlert snackbar={snackbar} closeSnackbar={closeSnackbar} />
      {actions({ deleteSelected })}

      <InventoryTable
        inventories={inventories}
        setSelectionModel={setSelectionModel}
      />
    </Box>
  );
};

export default InventoriesContainer;
