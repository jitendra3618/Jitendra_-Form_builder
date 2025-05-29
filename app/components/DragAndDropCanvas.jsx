// DragAndDropCanvas.jsx
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { setFields } from "../store/formSlice";

export default function DragAndDropCanvas() {
  const fields = useSelector((state) => state.form.fields);
  const dispatch = useDispatch();

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(fields);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);

    dispatch(setFields(reordered));
  };

  return (
    <div className="p-4 bg-white w-full">
      <h2 className="font-bold text-lg mb-4">Reorder Fields</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="formFields">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
              {fields.map((field, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided) => (
                    <div
                      className="p-4 border rounded bg-gray-50"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <p className="font-semibold">{field.label || field.type}</p>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
