// CustomFieldsTab.jsx
import { useState } from 'react';
import { Box, Button } from '@mui/material';
import FieldList from './customFields/FieldList';
import FieldTypeButtons from './customFields/FieldTypeButtons';
import SnackbarAlert from '../tools/Snackbar';
import { useSnackbar } from '../services/hooks/useSnackbar';

const fieldTypes = [
  { type: 'text', label: 'Text field' },
  { type: 'multiline', label: 'Multiline field' },
  { type: 'number', label: 'Number field' },
  { type: 'link', label: 'Link field' },
  { type: 'boolean', label: 'True/false' },
];

const CustomFieldsTab = ({ values, setFieldValue, errors, touched }) => {
  const addField = (type) => {
    const newField = {
      id: crypto.randomUUID(),
      name: '',
      type,
      description: '',
      visibleInTable: true,
      order: values.fields.length,
    };
    setFieldValue('fields', [...values.fields, newField]);
  };

  const deleteField = (index) => {
    const newFields = values.fields
      .filter((_, i) => i !== index)
      .map((field, i) => ({ ...field, order: i }));
    setFieldValue('fields', newFields);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 2,
        }}>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          // disabled={!formik.dirty || formik.isSubmitting}
        >
          {'save '}
        </Button>
      </Box>

      <FieldList
        fields={values.fields}
        setFieldValue={setFieldValue}
        deleteField={deleteField}
        fieldTypes={fieldTypes}
        errors={errors}
        touched={touched}
      />

      <FieldTypeButtons
        fieldTypes={fieldTypes}
        addField={addField}
        fields={values.fields}
      />
    </Box>
  );
};

export default CustomFieldsTab;
