import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Modal from '../../tools/Modal';
import Loader from '../../tools/Loader';
import SnackbarAlert from '../../tools/Snackbar';
import DefaultTable from '../../table/DefaultTable';
import getInventoryFields from '../../services/inventories/getInventoryFields';
import getInventoryItems from '../../services/items/getInventoryItems';
import handleDeleteItems from '../../services/items/handleDeleteItems';
import { useSnackbar } from '../../services/hooks/useSnackbar';
import getInventoryCustomIdFormat from '../../services/inventories/getInventoryCustomIdFormat';
import AddItemForm from '../../form/AddItemForm';
import handleAddItem from '../../services/items/handleAddItem';
import checkUserAccess from '../../services/inventories/checkUserAccess';
import ItemsColumns from './ItemsColumns';
const ItemsTab = ({ t, user, isCreator, isAdmin, inventory }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [hasWriteAccess, setHasWriteAccess] = useState(false);
  const [fields, setFields] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const [customIdFormat, setCustomIdFormat] = useState([]);

  const checkAccess = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const access = await checkUserAccess(inventory.id, user.id);
      setHasWriteAccess(access?.hasAccess || false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    checkAccess();
  }, []);

  const getInventoryData = async () => {
    const [fetchedFields, fetchedItems, fetchedCustomIdFormat] =
      await Promise.all([
        getInventoryFields(inventory.id),
        getInventoryItems(inventory.id),
        getInventoryCustomIdFormat(inventory.id),
      ]);
    setFields(fetchedFields);
    setItems(fetchedItems);
    setCustomIdFormat(fetchedCustomIdFormat);
  };

  const fetchInventoryData = async () => {
    if (!inventory?.id) return;
    setDataLoading(true);
    try {
      await getInventoryData();
    } catch (err) {
      console.error(err);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, [inventory]);

  const startAddItem = async (inventoryId, values, resetForm) => {
    await handleAddItem(inventoryId, values);
    resetForm();
    setOpenAddModal(false);
    const updatedItems = await getInventoryItems(inventory.id);
    setItems(updatedItems);
    showSnackbar(t('item.added'), 'success');
  };

  const handleAdd = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      await startAddItem(inventory.id, values, resetForm);
    } catch (err) {
      showSnackbar(t('item.add.error'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const startDeleteItem = async () => {
    await handleDeleteItems(inventory.id, selectionModel);
    setItems((prev) => prev.filter((i) => !selectionModel.includes(i.id)));
    setSelectionModel([]);
    showSnackbar(t('item.deleted'), 'success');
  };

  const handleDelete = async () => {
    if (!selectionModel.length) return;
    setIsLoading(true);
    try {
      await startDeleteItem();
    } catch (err) {
      console.error(err);
      showSnackbar(t('item.delete.error'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const canAddItem =
    user && (isCreator || isAdmin || inventory?.isPublic || hasWriteAccess);

  const columnVisibilityModel = Object.fromEntries(
    (fields || []).map(({ slot, visibleInTable }) => [slot, visibleInTable])
  );
  const columns = ItemsColumns({ t, fields });

  if (!inventory || dataLoading || isLoading) return <Loader />;

  return (
    <>
      <SnackbarAlert snackbar={snackbar} closeSnackbar={closeSnackbar} />
      {canAddItem && (
        <Box mb={2}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button variant='outlined' onClick={() => setOpenAddModal(true)}>
              {t('item.add')}
            </Button>
            <Button
              variant='outlined'
              color='error'
              disabled={!selectionModel.length}
              onClick={handleDelete}>
              {t('item.delete')}
            </Button>
          </Box>

          <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
            <AddItemForm
              t={t}
              customIdFormat={customIdFormat}
              fields={fields}
              user={user}
              handleAdd={handleAdd}
            />
          </Modal>
        </Box>
      )}

      <DefaultTable
        rows={items}
        columns={columns}
        setSelectionModel={setSelectionModel}
        columnVisibilityModel={columnVisibilityModel}
      />
    </>
  );
};

export default ItemsTab;
