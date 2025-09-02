// CustomFieldsTab.jsx
import { Box, Button } from '@mui/material';
import FieldList from './FieldList';
import FieldTypeButtons from './FieldTypeButtons';
import { useTranslation } from 'react-i18next';

const CustomFieldsTab = ({ values, setFieldValue, errors, touched }) => {
  const { t } = useTranslation();

  const fieldTypes = [
    { type: 'text', label: t('field.text') },
    { type: 'multiline', label: t('field.multiline') },
    { type: 'number', label: t('field.number') },
    { type: 'link', label: t('field.link') },
    { type: 'boolean', label: t('field.boolean') },
  ];
  const addField = (type) => {
    const slotsByType = {
      text: ['text1', 'text2', 'text3'],
      multiline: ['multiline1', 'multiline2', 'multiline3'],
      number: ['number1', 'number2', 'number3'],
      link: ['link1', 'link2', 'link3'],
      boolean: ['boolean1', 'boolean2', 'boolean3'],
    };
    const usedSlots = values.fields.map((f) => f.slot); // ВСЕ занятые слоты
    const freeSlot = slotsByType[type].find((s) => !usedSlots.includes(s));
    if (!freeSlot) return; // максимум достигнут

    const newField = {
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
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
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
