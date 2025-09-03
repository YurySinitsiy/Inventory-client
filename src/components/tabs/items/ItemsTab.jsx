import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Modal from '../../tools/Modal.jsx';
import Loader from '../../tools/Loader.jsx';
import SnackbarAlert from '../../tools/Snackbar.jsx';
import DefaultTable from '../../table/DefaultTable.jsx';
import apiFetch from '../../services/apiFetch.js';
import getInventoryFields from '../../services/inventories/getInventoryFields.js';
import getInventoryItems from '../../services/items/getInventoryItems.js';
import handleDeleteItems from '../../services/items/handleDeleteItems.js';
import { useSnackbar } from '../../services/hooks/useSnackbar.jsx';
import getInventoryCustomIdFormat from '../../services/inventories/getInventoryCustomIdFormat.js';
import AddItemForm from '../../form/AddItemForm.jsx';
import handleAddItem from '../../services/items/handleAddItem.js';

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

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const access = await apiFetch(
          `/api/inventories/${inventory.id}/access-write/user/${user.id}`
        );
        setHasWriteAccess(access?.hasAccess || false);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, []);

  useEffect(() => {
    const load = async () => {
      if (!inventory?.id) return;
      setDataLoading(true);
      try {
        const [fetchedFields, fetchedItems, fetchedCustomIdFormat] =
          await Promise.all([
            getInventoryFields(inventory.id),
            getInventoryItems(inventory.id),
            getInventoryCustomIdFormat(inventory.id),
          ]);
        setFields(fetchedFields);
        setItems(fetchedItems);
        setCustomIdFormat(
          Array.isArray(fetchedCustomIdFormat) ? fetchedCustomIdFormat : []
        );
      } catch (err) {
        console.error(err);
      } finally {
        setDataLoading(false);
      }
    };
    load();
  }, [inventory]);

  const handleAdd = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      await handleAddItem(inventory.id, values);
      resetForm();
      setOpenAddModal(false);
      const updatedItems = await getInventoryItems(inventory.id);
      setItems(updatedItems);
      showSnackbar(t('item.added'), 'success');
    } catch (err) {
      showSnackbar(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const canAddItem =
    user && (isCreator || isAdmin || inventory?.isPublic || hasWriteAccess);

  const defaultColumns = [
    { field: 'createdBy', headerName: t('created.by'), minWidth: 170, flex: 1 },
    {
      field: 'createdAt',
      headerName: t('created.at'),
      minWidth: 170,
      flex: 1,
      valueFormatter: (value) => new Date(value).toLocaleString(),
    },
    { field: 'customId', headerName: t('custom.id'), minWidth: 170, flex: 1 },
  ];

  const customColumns = (fields || []).map(({ slot, title }) => ({
    field: slot,
    headerName: title,
    minWidth: 50,
    flex: 1,
  }));
  const columnVisibilityModel = Object.fromEntries(
    (fields || []).map(({ slot, visibleInTable }) => [slot, visibleInTable])
  );
  const columns = [...customColumns, ...defaultColumns];

  const handleDelete = async () => {
    if (!selectionModel.length) return;
    setIsLoading(true);
    try {
      await handleDeleteItems(inventory.id, selectionModel);
      setItems((prev) => prev.filter((i) => !selectionModel.includes(i.id)));
      setSelectionModel([]);
      showSnackbar(t('item.deleted'), 'success');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
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
