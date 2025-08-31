// FieldTypeButtons.jsx
import { Box, Button } from '@mui/material';

const FieldTypeButtons = ({ fieldTypes, addField, fields = [] }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {fieldTypes.map((ft) => {
        const count = fields.filter((f) => f.type === ft.type).length;
        return (
          <Button
            key={ft.type}
            onClick={() => addField(ft.type)}
            disabled={count >= 3}
            variant='contained'
            sx={{ mr: 1, mb: 1 }}>
            {ft.label}
          </Button>
        );
      })}
    </Box>
  );
};

export default FieldTypeButtons;
