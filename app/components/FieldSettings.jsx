import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateField } from "~/redux/formSlice";

export default function FieldSettings() {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.form.fields);
  const [selectedFieldId, setSelectedFieldId] = React.useState(fields[0]?.id || null);

  // Get currently selected field
  const selectedField = fields.find((f) => f.id === selectedFieldId);

  // Handle field property change
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    let newValue = type === "checkbox" ? checked : value;

    // For options (dropdown), handle comma-separated list
    if (name === "options") {
      newValue = value.split(",").map((opt) => opt.trim());
    }

    dispatch(
      updateField({
        ...selectedField,
        [name]: newValue,
      })
    );
  }

  if (!selectedField) return <p className="text-gray-500">No field selected.</p>;

  return (
    <div className="border p-4 rounded shadow bg-white">
      <h3 className="text-lg font-semibold mb-3">Field Settings</h3>

      {/* Select field dropdown */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Select Field</label>
        <select
          value={selectedFieldId}
          onChange={(e) => setSelectedFieldId(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        >
          {fields.map((f) => (
            <option key={f.id} value={f.id}>
              {f.label} ({f.type})
            </option>
          ))}
        </select>
      </div>

      {/* Editable Properties */}
      <div className="space-y-3">
        <div>
          <label className="block font-medium">Label</label>
          <input
            type="text"
            name="label"
            value={selectedField.label}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        {/* Placeholder (only for text/textarea) */}
        {(selectedField.type === "text" || selectedField.type === "textarea") && (
          <div>
            <label className="block font-medium">Placeholder</label>
            <input
              type="text"
              name="placeholder"
              value={selectedField.placeholder}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
        )}

        {/* Required */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="required"
            checked={selectedField.required}
            onChange={handleChange}
            id="required-checkbox"
          />
          <label htmlFor="required-checkbox">Required</label>
        </div>

        {/* Options (for dropdown) */}
        {selectedField.type === "dropdown" && (
          <div>
            <label className="block font-medium">
              Options (comma separated)
            </label>
            <input
              type="text"
              name="options"
              value={selectedField.options.join(", ")}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
}
