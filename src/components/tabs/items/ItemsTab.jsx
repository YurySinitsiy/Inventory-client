import {
  Box,
  Button,
  Switch,
  TextField,
  FormControlLabel,
} from '@mui/material';
import { Formik, Form } from 'formik';
import { useEffect, useState } from 'react';
import Modal from '../../tools/Modal.jsx';
import Title from '../../tools/Title.jsx';
import Loader from '../../tools/Loader.jsx';
import SnackbarAlert from '../../tools/Snackbar.jsx';
import DefaultTable from '../../table/DefaultTable.jsx';
import { useTranslation } from 'react-i18next';

import apiFetch from '../../services/apiFetch.js';
import getInventoryFields from '../../services/inventories/getInventoryFields.js';
import getInventoryItems from '../../services/items/getInventoryItems.js';
import getInventory from '../../services/inventories/getInventory.js';
import handleAddItem from '../../services/items/handleAddItem.js';
import handleDeleteItems from '../../services/items/handleDeleteItems.js';
import { useSnackbar } from '../../services/hooks/useSnackbar.jsx';
import generateValue from '../../services/items/generateIdsValue.js';
import getInventoryCustomIdFormat from '../../services/inventories/getInventoryCustomIdFormat.js';
const ItemsTab = ({ user, isCreator, isAdmin, inventory }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [hasWriteAccess, setHasWriteAccess] = useState(false);
  const [fields, setFields] = useState([]);
  const [items, setItems] = useState([]);
  const [customIdFormat, setCustomIdFormat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const { t } = useTranslation();
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (!inventory || !user) return;

    const load = async () => {
      setIsLoading(true);
      try {
        // проверка доступа
        const access = await apiFetch(
          `/api/inventories/${inventory.id}/access-write/user/${user.id}`
        );
        setHasWriteAccess(access?.hasAccess || false);

        // поля и элементы
        const [fetchedFields, fetchedItems, fetchedCustomIdFormat] =
          await Promise.all([
            getInventoryFields(inventory.id),
            getInventoryItems(inventory.id),
            getInventoryCustomIdFormat(inventory.id),
          ]);
        setFields(fetchedFields);
        setItems(fetchedItems);
        setCustomIdFormat(fetchedCustomIdFormat);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [inventory, user]);

  const canAddItem =
    isCreator || isAdmin || inventory?.isPublic || hasWriteAccess;

  if (!inventory || isLoading) return <Loader />;

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

  const customColumns = fields.map(({ slot, title }) => ({
    field: slot,
    headerName: title,
    minWidth: 50,
    flex: 1,
  }));
  const columnVisibilityModel = Object.fromEntries(
    fields.map(({ slot, visibleInTable }) => [slot, visibleInTable])
  );
  const columns = [...customColumns, ...defaultColumns];

  const renderField = (f, values, setFieldValue) => {
    if (!f.visibleInTable) return null;
    if (f.type === 'multiline')
      return (
        <TextField
          key={f.slot}
          label={f.title}
          multiline
          value={values[f.slot]}
          onChange={(e) => setFieldValue(f.slot, e.target.value)}
          fullWidth
        />
      );
    if (f.type === 'boolean')
      return (
        <FormControlLabel
          key={f.slot}
          control={
            <Switch
              checked={values[f.slot] || false}
              onChange={(e) => setFieldValue(f.slot, e.target.checked)}
            />
          }
          label={f.title}
        />
      );
    return (
      <TextField
        key={f.slot}
        type={f.type}
        label={f.title}
        value={values[f.slot]}
        onChange={(e) => setFieldValue(f.slot, e.target.value)}
        fullWidth
      />
    );
  };

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
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

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
            <Formik
              initialValues={fields.reduce(
                (acc, f) => ({ ...acc, [f.slot]: '' }),
                {
                  customId:
                    customIdFormat
                      ?.map((p) => generateValue(p.type, p.value))
                      .join('-') || '',
                  createdBy: user.email,
                }
              )}
              onSubmit={handleAdd}>
              {({ values, setFieldValue }) => (
                <Form>
                  <Title variant='h5' sx={{ mb: 1 }}>
                    {t('item.add')}
                  </Title>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {fields.map((f) => renderField(f, values, setFieldValue))}
                    <Button type='submit' variant='outlined'>
                      {t('save')}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
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
