// FieldTypeButtons.jsx
import { Box, Button } from '@mui/material';

const FieldTypeButtons = ({ fieldTypes, addField, fields = [] }) => {
  const safeFields = Array.isArray(fields) ? fields : [];

  const canAddField = (type) =>
    safeFields.filter((f) => f.type === type).length < 3;

  return (
    <Box sx={{ mt: 2 }}>
      {fieldTypes.map((ft) => (
        <Button
          key={ft.type}
          onClick={() => addField(ft.type)}
          disabled={!canAddField(ft.type)}
          variant='contained'
          sx={{ mr: 1, mb: 1 }}>
          {ft.label}
        </Button>
      ))}
    </Box>
  );
};

export default FieldTypeButtons;
