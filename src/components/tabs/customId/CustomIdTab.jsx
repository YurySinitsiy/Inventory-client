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
import Title from '../../tools/Title'
const TYPES = [
  { label: 'Фиксированный текст', value: 'fixed' },
  { label: '20-битное число', value: 'random20' },
  { label: '32-битное число', value: 'random32' },
  { label: '6-значное число', value: 'random6' },
  { label: '9-значное число', value: 'random9' },
  { label: 'GUID', value: 'guid' },
  { label: 'Дата/время', value: 'datetime' },
];

const CustomIdTab = ({ values, setFieldValue, fieldName }) => {
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
    if (!result.destination) return;
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
        Превью итогового ID: <strong>{combinedPreview}</strong>
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
                        alignItems: 'center',
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
                          value={row.value}
                          onChange={(val) => handleValueChange(row.id, val)}
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
        Добавить элемент
      </Button>
    </Box>
  );
};

export default CustomIdTab;
