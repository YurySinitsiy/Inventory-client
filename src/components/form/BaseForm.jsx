import { useState } from 'react';
import { Formik, Form } from 'formik';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Title from '../tools/Title';

const BaseForm = ({
  title,
  fields,
  validationSchema,
  initialValues,
  onSubmit,
  submitText,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        <Form>
          <Box sx={{ p: 3, borderRadius: '20px', maxWidth: '900px' }}>
            <Title variant='h5'>{title}</Title>
            {fields.map(({ name, label, type, options }, index) => {
              const key = name || label || index;
              const commonProps = {
                fullWidth: true,
                margin: 'normal',
                label,
                name,
                value: values[name] || '',
                onChange: handleChange,
                onBlur: handleBlur,
                error: touched[name] && Boolean(errors[name]),
                helperText: touched[name] && errors[name],
              };
              if (type === 'select') {
                return (
                  <TextField key={key} select {...commonProps}>
                    {options?.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              }
              if (type === 'multiline') {
                return (
                  <TextField key={key} {...commonProps} multiline rows={4} />
                );
              }
              if (type === 'password') {
                return (
                  <TextField
                    key={key}
                    {...commonProps}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton onClick={togglePassword} edge='end'>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                );
              }
              return <TextField key={key} {...commonProps} type={type} />;
            })}

            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              size='large'
              sx={{ mt: 3, py: 1.5 }}
              disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : submitText}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default BaseForm;
