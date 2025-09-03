import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';
import generateValue from '../../services/items/generateIdsValue';
import UnicodeField from './UnicodeField';
import Title from '../../tools/Title';

const CustomIdTab = ({
  values,
  setFieldValue,
  fieldName,
  errors,
  touched,
  t,
  handleBlur
}) => {
  const TYPES = [
    { label: t('types.fixed'), value: 'fixed' },
    { label: t('types.20bit'), value: 'random20' },
    { label: t('types.32bit'), value: 'random32' },
    { label: t('types.6digit.number'), value: 'random6' },
    { label: t('types.9digit.number'), value: 'random9' },
    { label: t('types.guid'), value: 'guid' },
    { label: t('types.date'), value: 'datetime' },
  ];
  const rows = values[fieldName] || [];

  const handleAdd = () => {
    const newRow = {
      id: uuidv4(),
      type: 'fixed',
      value: '',
    };
    setFieldValue(fieldName, [...rows, newRow]);
  };

  const handleDelete = (id) => {
    setFieldValue(
      fieldName,
      rows.filter((r) => r.id !== id)
    );
  };

  const handleTypeChange = (id, type) => {
    setFieldValue(
      fieldName,
      rows.map((r) =>
        r.id === id ? { ...r, type, value: generateValue(type) } : r
      )
    );
  };

  const handleValueChange = (id, userValue) => {
    setFieldValue(
      fieldName,
      rows.map((r) => (r.id === id ? { ...r, value: userValue } : r))
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      const reordered = Array.from(rows);
      reordered.splice(result.source.index, 1);
      setFieldValue(fieldName, reordered);
      return;
    }
    const reordered = Array.from(rows);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setFieldValue(fieldName, reordered);
  };

  const combinedPreview = rows.map((r) => r.value).join('-');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}>
      <Title variant='h6'>
        {t('id.preview')} <strong>{combinedPreview}</strong>
      </Title>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='customIdRows'>
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              {rows.map((row, index) => (
                <Draggable key={row.id} draggableId={row.id} index={index}>
                  {(provided) => (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'baseline',
                        flexWrap: 'wrap',
                        gap: 2,
                        borderBottom: '1px solid gray',
                        padding: 1,
                      }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      <Select
                        value={row.type}
                        onChange={(e) =>
                          handleTypeChange(row.id, e.target.value)
                        }
                        sx={{ mr: 1, minWidth: 180 }}>
                        {TYPES.map((t) => (
                          <MenuItem key={t.value} value={t.value}>
                            {t.label}
                          </MenuItem>
                        ))}
                      </Select>

                      {row.type === 'fixed' ? (
                        <UnicodeField
                          index={index}
                          value={row.value}
                          onChange={(val) => handleValueChange(row.id, val)}
                          errors={errors}
                          touched={touched}
                          onBlur={handleBlur}
                        />
                      ) : (
                        <TextField
                          value={row.value}
                          variant='outlined'
                          size='medium'
                          sx={{ mr: 1, flex: 1 }}
                          InputProps={{ readOnly: true }}
                        />
                      )}

                      <IconButton onClick={() => handleDelete(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      <Button variant='contained' color='primary' onClick={handleAdd}>
        {t('item.add')}
      </Button>
    </Box>
  );
};

export default CustomIdTab;
