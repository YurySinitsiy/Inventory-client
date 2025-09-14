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
import { useTranslation } from 'react-i18next';
const CustomIdTab = ({
  values,
  setFieldValue,
  fieldName,
  errors,
  touched,
  handleBlur,
}) => {
  const { t } = useTranslation();

  const types = [
    { label: t('types.fixed'), value: 'fixed' },
    { label: t('types.20bit'), value: 'random20' },
    { label: t('types.32bit'), value: 'random32' },
    { label: t('types.6digit.number'), value: 'random6' },
    { label: t('types.9digit.number'), value: 'random9' },
    { label: t('types.guid'), value: 'guid' },
    { label: t('types.date'), value: 'datetime' },
  ];
  const rows = values[fieldName] || [];

  const updateRow = (id, fn) =>
    setFieldValue(
      fieldName,
      rows.map((r) => (r.id === id ? fn(r) : r))
    );

  const handleAdd = () => {
    const newRow = {
      id: uuidv4(),
      type: 'fixed',
      value: '',
    };
    setFieldValue(fieldName, [...rows, newRow]);
  };

  const handleDelete = (id) =>
    setFieldValue(
      fieldName,
      rows.filter((r) => r.id !== id)
    );

  const handleTypeChange = (id, type) =>
    updateRow(id, (r) => ({ ...r, type, value: generateValue(type) }));

  const handleValueChange = (id, value) =>
    updateRow(id, (r) => ({ ...r, value }));

  const handleDragEnd = ({ source, destination }) => {
    if (!destination) return handleDelete(rows[source.index].id);
    const reordered = [...rows];
    const [moved] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, moved);
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
                        {types.map((t) => (
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
