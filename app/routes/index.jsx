import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addField,
  reorderFields,
  updateField,
  removeField,
  loadTemplate,
  undo,
  redo,
  toggleTheme,
} from "../redux/formSlice";
import FormBuilder from "../components/FormBuilder";
import FormPreview from "../components/FormPreview";
import ThemeToggle from "../components/ThemeToggle";
import Templates from "../components/Templates";

export default function Index() {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.form.fields);
  const theme = useSelector((state) => state.form.theme);

  // Load from localStorage on mount (auto-save)
  useEffect(() => {
    const saved = localStorage.getItem("formFields");
    if (saved) {
      dispatch(loadTemplate(JSON.parse(saved)));
    }
  }, []);

  // Auto-save form to localStorage
  useEffect(() => {
    localStorage.setItem("formFields", JSON.stringify(fields));
  }, [fields]);

  const handleAddField = (type) => {
    const newField = {
      type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
      required: false,
      placeholder: "",
      options: type === "dropdown" ? ["Option 1", "Option 2"] : [],
      helpText: "",
      validation: {
        minLength: 0,
        maxLength: 100,
        pattern: "",
      },
    };
    dispatch(addField(newField));
  };

  const handleUndo = () => {
    dispatch(undo());
  };

  const handleRedo = () => {
    dispatch(redo());
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Form Builder</h1>
        <ThemeToggle
          theme={theme}
          onToggle={() => dispatch(toggleTheme())}
        />
      </div>

      <div className="flex space-x-8">
        <div className="w-1/3 border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Add Fields</h2>
          <div className="flex flex-col space-y-2">
            {["text", "textarea", "dropdown", "checkbox", "date"].map((type) => (
              <button
                key={type}
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                onClick={() => handleAddField(type)}
              >
                Add {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <Templates />

          <div className="mt-6 space-x-2">
            <button
              onClick={handleUndo}
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            >
              Undo
            </button>
            <button
              onClick={handleRedo}
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            >
              Redo
            </button>
          </div>
        </div>

        <div className="w-1/3 border p-4 rounded shadow overflow-auto max-h-[80vh]">
          <FormBuilder />
        </div>

        <div className="w-1/3 border p-4 rounded shadow overflow-auto max-h-[80vh]">
          <FormPreview />
        </div>
      </div>
    </div>
  );
}
