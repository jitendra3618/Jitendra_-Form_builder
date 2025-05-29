import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addField, reorderFields } from "../redux/formSlice";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

// Sortable Field Item
function SortableField({ id, label }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px 12px",
    border: "1px solid #ccc",
    marginBottom: "8px",
    borderRadius: "4px",
    backgroundColor: "white",
    cursor: "grab",
    userSelect: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {label}
    </div>
  );
}

export default function FormBuilder() {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.form.fields);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: undefined,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      const newFields = arrayMove(fields, oldIndex, newIndex);
      dispatch(reorderFields(newFields));
    }
  }

  function addNewField(type) {
    const newField = {
      id: crypto.randomUUID(),
      type,
      label: `${type} field`,
      placeholder: "",
      required: false,
      options: type === "dropdown" ? ["Option 1", "Option 2"] : [],
    };
    dispatch(addField(newField));
  }

  return (
    <div>
      {/* Buttons to add fields */}
      <div className="mb-4 flex space-x-2">
        {["text", "textarea", "dropdown", "checkbox", "date"].map((type) => (
          <button
            key={type}
            onClick={() => addNewField(type)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Sortable fields list */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          {fields.map((field) => (
            <SortableField key={field.id} id={field.id} label={field.label} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
