// CustomFieldsTab.jsx
import { useState } from 'react';
import { Box, Button } from '@mui/material';
import FieldList from './customFields/FieldList';
import FieldTypeButtons from './customFields/FieldTypeButtons';
import SnackbarAlert from '../tools/Snackbar';
import { useSnackbar } from '../services/hooks/useSnackbar';
import { useTranslation } from 'react-i18next';

const fieldTypes = [
  { type: 'text', label: 'Text field' },
  { type: 'multiline', label: 'Multiline field' },
  { type: 'number', label: 'Number field' },
  { type: 'link', label: 'Link field' },
  { type: 'boolean', label: 'True/false' },
];

const CustomFieldsTab = ({ values, setFieldValue, errors, touched }) => {
  const { t } = useTranslation();

  const addField = (type) => {
    const slotsByType = {
      text: ['text1', 'text2', 'text3'],
      multiline: ['multiline1', 'multiline2', 'multiline3'],
      number: ['number1', 'number2', 'number3'],
      link: ['link1', 'link2', 'link3'],
      boolean: ['boolean1', 'boolean2', 'boolean3'],
    };
    const usedSlots = values.fields
      .filter((f) => f.type === type)
      .map((f) => f.slot);
    console.log(usedSlots)
    const freeSlot = slotsByType[type].find((s) => !usedSlots.includes(s));
    if (!freeSlot) return; // максимум достигнут

    const newField = {
      id: crypto.randomUUID(),
      slot: freeSlot,
      title: '',
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
        <Button type='submit' variant='contained' color='primary'>
          {t('save')}
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
