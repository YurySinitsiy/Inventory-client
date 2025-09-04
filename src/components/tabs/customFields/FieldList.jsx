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
  handleBlur,
}) => {
  const updateOrder = (list) =>
    setFieldValue(
      'fields',
      list.map((f, i) => ({ ...f, order: i }))
    );

  const handleDragEnd = ({ source, destination }) => {
    if (!destination) return deleteField(fields[source.index].order);
    const newFields = [...fields];
    const [moved] = newFields.splice(source.index, 1);
    newFields.splice(destination.index, 0, moved);
    updateOrder(newFields);
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
