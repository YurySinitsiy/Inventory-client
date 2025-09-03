import { Formik, Form } from 'formik';
import InventoryTabs from '../tabs/InventoryTabs.jsx';
import inventoryInitialValues from '../services/inventories/entry/inventoryInitialValues.js';
import { useState, useEffect, useRef, useCallback } from 'react';
import updateInventoryValidSchema from '../services/inventories/entry/updateInventoryValidSchema.js';
import isEqual from 'lodash.isequal';
import updateInventory from '../services/inventories/updateInventory.js';
import valuesToUpdateInventory from '../services/inventories/entry/valuesToUpdateInventory.js';
import SnackbarAlert from '../tools/Snackbar.jsx';
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

  const handleSave = useCallback(
    async (valuesToUpdate) => {
      if (isSaving) return;

      if (!hasChanges(valuesToUpdate, lastSavedValues)) {
        return;
      }

      setIsSaving(true);
      showSnackbar('Saving...', 'info');

      try {
        const dataToUpdate = valuesToUpdateInventory(valuesToUpdate, version);
        const data = await updateInventory(inventory.id, dataToUpdate);

        setVersion(data.version);
        setLastSavedValues({ ...valuesToUpdate, version: data.version });
        showSnackbar(t('saved'), 'success');
      } catch (err) {
        console.error('Save failed', err);
        if (err?.currentVersion) {
          showSnackbar(
            t('saved.versionConflict', { currentVersion: err.currentVersion }),
            'error'
          );
          setVersion(err.currentVersion);
        } else {
          showSnackbar(t('saved.fail'), 'error');
        }
      } finally {
        setIsSaving(false);
      }
    },
    [isSaving, hasChanges, lastSavedValues, version, inventory]
  );

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!formikRef.current || isSaving) return;

      const currentValues = {
        ...formikRef.current.values,
        version: version,
      };

      if (!hasChanges(currentValues, lastSavedValues)) {
        return;
      }
      const errors = await formikRef.current.validateForm();

      if (Object.keys(errors).length > 0) {
        showSnackbar(t('form.invalid'), 'warning');
      }
      formikRef.current.submitForm();
    }, 9000);

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
        {({ values, setFieldValue, errors, touched, handleBlur }) => (
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
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default InventoryForm;
