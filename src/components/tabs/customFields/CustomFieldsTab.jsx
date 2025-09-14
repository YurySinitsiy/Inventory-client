import { Box } from '@mui/material';
import FieldList from './FieldList';
import FieldTypeButtons from './FieldTypeButtons';
import { useTranslation } from 'react-i18next';

const CustomFieldsTab = ({
  values,
  setFieldValue,
  errors,
  touched,
  handleBlur,
}) => {
  const { t } = useTranslation();

  const fieldTypes = [
    { type: 'text', label: t('field.text') },
    { type: 'multiline', label: t('field.multiline') },
    { type: 'number', label: t('field.number') },
    { type: 'link', label: t('field.link') },
    { type: 'boolean', label: t('field.boolean') },
  ];

  const slotsByType = {
    text: ['text1', 'text2', 'text3'],
    multiline: ['multiline1', 'multiline2', 'multiline3'],
    number: ['number1', 'number2', 'number3'],
    link: ['link1', 'link2', 'link3'],
    boolean: ['boolean1', 'boolean2', 'boolean3'],
  };

  const createNewField = (slot, type, order) => ({
    slot,
    title: '',
    type,
    description: '',
    visibleInTable: true,
    order,
  });

  const addField = (type) => {
    const usedSlots = values.fields.map((f) => f.slot);
    const freeSlot = slotsByType[type].find((s) => !usedSlots.includes(s));
    if (!freeSlot) return;
    setFieldValue('fields', [
      ...values.fields,
      createNewField(freeSlot, type, values.fields.length),
    ]);
  };

  const deleteField = (index) => {
    const newFields = values.fields
      .filter((_, i) => i !== index)
      .map((field, i) => ({ ...field, order: i }));
    setFieldValue('fields', newFields);
  };

  return (
    <Box
      sx={{
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
        handleBlur={handleBlur}
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
