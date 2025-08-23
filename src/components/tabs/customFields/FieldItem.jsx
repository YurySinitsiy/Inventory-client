// FieldItem.jsx
import { forwardRef } from 'react';
import { ListItem, TextField, Select, MenuItem, Switch, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FieldItem = forwardRef(({ field, index, formik, deleteField, fieldTypes, draggableProps, dragHandleProps }, ref) => (
    <ListItem
        ref={ref}
        {...draggableProps}
        {...dragHandleProps}
        sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 2, borderBottom: '1px solid gray' }}
    >
        <TextField
            label="Field name"
            name={`fields[${index}].name`}
            value={field.name || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.fields?.[index]?.name && formik.errors.fields?.[index]?.name)}
            helperText={formik.touched.fields?.[index]?.name && formik.errors.fields?.[index]?.name}
        />
        <Select name={`fields[${index}].type`} value={field.type} onChange={formik.handleChange} onBlur={formik.handleBlur}>
            {fieldTypes.map(ft => <MenuItem key={ft.type} value={ft.type}>{ft.label}</MenuItem>)}
        </Select>
        <TextField
            label="Description (Tooltip)"
            name={`fields[${index}].description`}
            value={field.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        />
        <Tooltip title="Show in the table">
            <Switch
                checked={field.visibleInTable}
                onChange={(e) => formik.setFieldValue(`fields[${index}].visibleInTable`, e.target.checked)}
            />
        </Tooltip>
        <Tooltip title="Delete field">
            <IconButton onClick={() => deleteField(index)}>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    </ListItem>
));

export default FieldItem;
