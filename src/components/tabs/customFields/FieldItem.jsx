import { forwardRef } from 'react';
import {
  ListItem,
  TextField,
  Select,
  MenuItem,
  Switch,
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

const FieldItem = forwardRef(
  (
    {
      field,
      index,
      setFieldValue,
      deleteField,
      fieldTypes,
      draggableProps,
      dragHandleProps,
      errors,
      touched,
      handleBlur,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const handleChange = (key, value) => {
      setFieldValue(`fields[${index}].${key}`, value);
    };

    const titleError =
      touched.fields?.[index]?.title && errors.fields?.[index]?.title;
    const typeError =
      touched.fields?.[index]?.type && errors.fields?.[index]?.type;

    return (
      <ListItem
        ref={ref}
        {...draggableProps}
        {...dragHandleProps}
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 2,
          borderBottom: '1px solid gray',
        }}>
        <TextField
          label={t('title')}
          value={field.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          error={Boolean(titleError)}
          helperText={titleError || ''}
          onBlur={handleBlur}
        />

        <TextField
          label={t('type')}
          value={
            fieldTypes.find((ft) => ft.type === field.type)?.label || field.type
          }
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          label={t('description')}
          value={field.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
        />

        <Tooltip title='Show in the table'>
          <Switch
            checked={field.visibleInTable}
            onChange={(e) => handleChange('visibleInTable', e.target.checked)}
          />
        </Tooltip>

        <Tooltip title='Delete field'>
          <IconButton onClick={() => deleteField(index)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItem>
    );
  }
);

export default FieldItem;
