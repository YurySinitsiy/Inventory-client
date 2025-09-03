// FieldList.jsx
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { List } from '@mui/material';
import FieldItem from './FieldItem';

const FieldList = ({
  fields = [],
  setFieldValue,
  deleteField,
  fieldTypes,
  errors,
  touched,
  handleBlur
}) => {
  const handleDragEnd = (result) => {
    if (!result.destination) {
      const fieldToDelete = fields[result.source.index];
      deleteField(fieldToDelete.order);
      return;
    }
    const newFields = [...fields];
    const [moved] = newFields.splice(result.source.index, 1);
    newFields.splice(result.destination.index, 0, moved);
    setFieldValue(
      'fields',
      newFields.map((f, i) => ({ ...f, order: i }))
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='fields'>
        {(provided) => (
          <List
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {fields.map((field, index) => (
              <Draggable
                key={field.slot}
                draggableId={field.slot}
                index={index}>
                {(provided) => (
                  <FieldItem
                    field={field}
                    index={index}
                    setFieldValue={setFieldValue}
                    deleteField={deleteField}
                    fieldTypes={fieldTypes}
                    ref={provided.innerRef}
                    draggableProps={provided.draggableProps}
                    dragHandleProps={provided.dragHandleProps}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default FieldList;
