import { Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import Title from '../tools/Title';
import generateValue from '../services/items/generateIdsValue';
import * as Yup from 'yup';
import ItemFormFields from './fields/ItemFormFields';
const AddItemForm = ({ t, customIdFormat, fields, user, handleAdd }) => {
  const initialValues = fields.reduce((acc, f) => ({ ...acc, [f.slot]: '' }), {
    customId:
      customIdFormat.map((p) => generateValue(p.type, p.value)).join('-') || '',
    createdBy: user?.email || '',
  });

  const buildValidationSchema = (fields) => {
    const schema = {};

    fields.forEach((f) => {
      if (!f.visibleInTable) return;
      if (f.type === 'number') {
        schema[f.slot] = Yup.number().required(t('required'));
      } else if (f.type === 'boolean') {
        schema[f.slot] = Yup.boolean().notRequired();
      } else {
        schema[f.slot] = Yup.string().required(t('required'));
      }
    });

    return Yup.object().shape(schema);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={buildValidationSchema(fields)}
      onSubmit={handleAdd}>
      {({ values, setFieldValue, touched, errors, setFieldTouched }) => (
        <Form>
          <Title variant='h5' sx={{ mb: 1 }}>
            {t('item.add')}
          </Title>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {fields?.map((f) => (
              <ItemFormFields
                key={f.slot}
                f={f}
                values={values}
                setFieldValue={setFieldValue}
                touched={touched}
                errors={errors}
                setFieldTouched={setFieldTouched}
              />
            ))}
            <Button type='submit' variant='outlined'>
              {t('save')}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddItemForm;
