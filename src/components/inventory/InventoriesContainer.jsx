import { Box } from '@mui/material';
import Loader from '../tools/Loader';
import { useState } from 'react';
import InventoryTable from '../table/InventoryTable';
import handleDeleteInventory from '../services/inventories/handleDeleteInventory';
import { useTranslation } from 'react-i18next';

const InventoriesContainer = ({
  inventories,
  actions,
  setSelectionModel,
  selectionModel,
  setUserInventories,
  checkboxSelection,
  showSnackbar,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const removeDeleted = (prev) =>
    prev.filter((row) => !selectionModel.includes(row.id));

  const deleteSelected = async () => {
    if (!selectionModel.length) return setSelectionModel([]);
    setIsLoading(true);
    try {
      await handleDeleteInventory(selectionModel);
      setUserInventories(removeDeleted);
      showSnackbar(t('inventory.deleted'), 'success');
      setSelectionModel([]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Box>
      {actions({ deleteSelected })}

      <InventoryTable
        inventories={inventories}
        setSelectionModel={setSelectionModel}
        checkboxSelection={checkboxSelection}
      />
    </Box>
  );
};

export default InventoriesContainer;
