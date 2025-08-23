// FieldList.jsx
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { List } from '@mui/material';
import FieldItem from './FieldItem';

const FieldList = ({ fields, formik, deleteField, fieldTypes }) => {
    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const newFields = [...fields];
        const [moved] = newFields.splice(result.source.index, 1);
        newFields.splice(result.destination.index, 0, moved);
        formik.setFieldValue('fields', newFields.map((f, i) => ({ ...f, order: i })));
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="fields">
                {(provided) => (
                    <List {...provided.droppableProps} ref={provided.innerRef} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {fields.map((field, index) => (
                            <Draggable key={field.id} draggableId={field.id} index={index}>
                                {(provided) => (
                                    <FieldItem
                                        field={field}
                                        index={index}
                                        formik={formik}
                                        deleteField={deleteField}
                                        fieldTypes={fieldTypes}
                                        ref={provided.innerRef}
                                        draggableProps={provided.draggableProps}
                                        dragHandleProps={provided.dragHandleProps}
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
