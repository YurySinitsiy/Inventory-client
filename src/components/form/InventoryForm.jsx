import { Formik, Form } from 'formik';
import InventoryTabs from '../tabs/InventoryTabs';
import inventoryInitialValues from '../services/inventories/entry/inventoryInitialValues';
import { useState, useEffect, useRef, useCallback } from 'react';
import updateInventoryValidSchema from '../services/inventories/entry/updateInventoryValidSchema';
import isEqual from 'lodash.isequal';
import updateInventory from '../services/inventories/updateInventory';
import valuesToUpdateInventory from '../services/inventories/entry/valuesToUpdateInventory';
import SnackbarAlert from '../tools/Snackbar';
import { useSnackbar } from '../services/hooks/useSnackbar';

const InventoryForm = ({ t, inventory, user }) => {
  const formikRef = useRef();
  const [version, setVersion] = useState(1);
  const [lastSavedValues, setLastSavedValues] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const initialValues = inventoryInitialValues(inventory);
  const validationSchema = updateInventoryValidSchema(t);

  useEffect(() => {
    if (inventory) {
      setVersion(initialValues.version);
      setLastSavedValues(initialValues);
    }
  }, [inventory]);

  const hasChanges = useCallback(
    (current, lastSaved) => !isEqual(current, lastSaved),
    []
  );

  const versionConflictHandling = (err) => {
    if (err?.currentVersion) {
      setVersion(err.currentVersion);
      return showSnackbar(
        t('saved.versionConflict', { currentVersion: err.currentVersion }),
        'error'
      );
    }
    showSnackbar(t('saved.fail'), 'error');
  };

  const handleUpdateInventory = async (valuesToUpdate) => {
    const dataToUpdate = valuesToUpdateInventory(valuesToUpdate, version);
    const data = await updateInventory(inventory.id, dataToUpdate);
    setVersion(data.version);
    setLastSavedValues({ ...valuesToUpdate, version: data.version });
    showSnackbar(t('saved'), 'success');
  };

  const handleSave = useCallback(
    async (valuesToUpdate) => {
      if (isSaving || !hasChanges(valuesToUpdate, lastSavedValues)) return;
      setIsSaving(true);
      showSnackbar(t('saving'), 'info');
      try {
        await handleUpdateInventory(valuesToUpdate);
      } catch (err) {
        versionConflictHandling(err);
      } finally {
        setIsSaving(false);
      }
    },
    [isSaving, hasChanges, lastSavedValues, version, inventory]
  );

  const checkAndSave = async () => {
    if (!formikRef.current || isSaving) return;

    const currentValues = { ...formikRef.current.values, version };
    if (!hasChanges(currentValues, lastSavedValues)) return;

    const errors = await formikRef.current.validateForm();
    if (Object.keys(errors).length > 0)
      showSnackbar(t('form.invalid'), 'warning');

    formikRef.current.submitForm();
  };

  useEffect(() => {
    const interval = setInterval(checkAndSave, 9000);
    return () => clearInterval(interval);
  }, [lastSavedValues, version, handleSave, isSaving]);

  return (
    <>
      <SnackbarAlert snackbar={snackbar} closeSnackbar={closeSnackbar} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        innerRef={formikRef}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={handleSave}>
        {({ values, setFieldValue, errors, touched, handleBlur, isSubmitting }) => (
          <Form>
            <InventoryTabs
              inventory={inventory}
              user={user}
              values={values}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              t={t}
              handleBlur={handleBlur}
              isSubmitting={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default InventoryForm;
