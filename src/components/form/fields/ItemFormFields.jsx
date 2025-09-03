import {
  Switch,
  TextField,
  FormControlLabel,
  FormHelperText,
  Box,
} from '@mui/material';
import Helper from '../../tools/Helper';

const ItemFormFields = ({
  f,
  values,
  setFieldValue,
  touched,
  errors,
  setFieldTouched,
}) => {
  if (!f.visibleInTable) return null;

  if (f.type === 'boolean')
    return (
      <Box key={f.slot} sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormControlLabel
          control={
            <Switch
              checked={values[f.slot] || false}
              onChange={(e) => setFieldValue(f.slot, e.target.checked)}
            />
          }
          label={f.title}
        />
        {touched[f.slot] && errors[f.slot] && (
          <FormHelperText error>{errors[f.slot]}</FormHelperText>
        )}
      </Box>
    );

  const commonProps = {
    label: f.title,
    value: values[f.slot],
    onChange: (e) => setFieldValue(f.slot, e.target.value),
    onBlur: () => setFieldTouched(f.slot, true),
    fullWidth: true,
    InputProps: { endAdornment: <Helper value={f.description} /> },
    error: touched[f.slot] && Boolean(errors[f.slot]),
    helperText: touched[f.slot] && errors[f.slot],
  };

  if (f.type === 'multiline')
    return <TextField key={f.slot} {...commonProps} multiline />;

  return <TextField key={f.slot} {...commonProps} type={f.type} />;
};

export default ItemFormFields;
