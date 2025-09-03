import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, FormHelperText } from '@mui/material';
import Title from '../tools/Title';
import MarkdownField from './fields/MarkdownField';
import CategoryField from './fields/CategoryField';
import TagsField from './fields/TagsField';
import PublicCheckbox from './fields/PublicCheckbox';
import InventoryImageUpload from './fields/InventoryImageUpload';
import { useTranslation } from 'react-i18next';

const AddInventoryForm = ({ categories, tagOptions, onSubmit }) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    title: Yup.string().required(t('required')),
    description: Yup.string().required(t('required')),
    category: Yup.string().required(t('required')),
  });

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        category: '',
        tags: [],
        imageUrl: null,
        isPublic: false,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({ values, errors, touched, setFieldValue, handleBlur }) => (
        <Box sx={{ p: 3, borderRadius: '20px', maxWidth: '900px' }}>
          <Title variant='h5'>{t('inventory.add')}</Title>
          <Form>
            {/* Title */}
            <TextField
              fullWidth
              margin='normal'
              label={t('title')}
              name='title'
              value={values.title}
              onChange={(e) => setFieldValue('title', e.target.value)}
              onBlur={handleBlur}
              error={touched.title && Boolean(errors.title)}
            />
            {touched.title && errors.title && (
              <FormHelperText error>{errors.title}</FormHelperText>
            )}

            {/* Description */}
            <MarkdownField
              value={values.description}
              onChange={(val) => setFieldValue('description', val)}
              label={t('description')}
            />
            {touched.description && errors.description && (
              <FormHelperText error>{errors.description}</FormHelperText>
            )}

            {/* Category */}
            <CategoryField
              value={values.category}
              onChange={(val) => setFieldValue('category', val)}
              categories={categories}
              label={t('category')}
            />
            {touched.category && errors.category && (
              <FormHelperText error>{errors.category}</FormHelperText>
            )}

            {/* Tags */}
            <TagsField
              value={values.tags}
              onChange={(val) => setFieldValue('tags', val)}
              tagOptions={tagOptions}
              label={t('tags')}
            />

            {/* Image Upload */}
            <InventoryImageUpload
              value={values.imageUrl}
              onChange={(url) => setFieldValue('imageUrl', url)}
            />

            {/* Public Checkbox */}
            <PublicCheckbox
              name='isPublic'
              value={values}
              onChange={(e) => setFieldValue('isPublic', e.target.checked)}
              onBlur={handleBlur}
              label={t('public.make')}
            />

            {/* Submit */}
            <Button
              type='submit'
              variant='contained'
              color='primary'
              sx={{ mt: 3 }}>
              {t('save')}
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default AddInventoryForm;
