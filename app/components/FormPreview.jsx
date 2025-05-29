import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function FormPreview() {
  const fields = useSelector((state) => state.form.fields);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    const err = {};
    if (field.required && (!value || value.trim() === "")) {
      err.required = "This field is required";
    }
    if (
      field.validation.minLength &&
      value.length < field.validation.minLength
    ) {
      err.minLength = `Minimum length is ${field.validation.minLength}`;
    }
    if (
      field.validation.maxLength &&
      value.length > field.validation.maxLength
    ) {
      err.maxLength = `Maximum length is ${field.validation.maxLength}`;
    }
    if (field.validation.pattern) {
      try {
        const regex = new RegExp(field.validation.pattern);
        if (!regex.test(value)) {
          err.pattern = "Invalid format";
        }
      } catch {
        // invalid regex pattern
      }
    }
    return Object.keys(err).length === 0 ? null : err;
  };

  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));

    const field = fields.find((f) => f.id === id);
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [id]: error }));
  };

  const renderField = (field) => {
    const value = formData[field.id] || "";
    const error = errors[field.id];

    const commonProps = {
      id: field.id,
      name: field.id,
      value,
      onChange: (e) => handleChange(field.id, e.target.value),
      placeholder: field.placeholder,
      required: field.required,
      className:
        "w-full border rounded px-2 py-1 " +
        (error ? "border-red-500" : "border-gray-300"),
      "aria-describedby": `${field.id}-help`,
    };

    switch (field.type) {
      case "text":
        return <input type="text" {...commonProps} />;
      case "textarea":
        return <textarea {...commonProps} rows={4} />;
      case "dropdown":
        return (
          <select
            {...commonProps}
            onChange={(e) => handleChange(field.id, e.target.value)}
          >
            <option value="">Select an option</option>
            {field.options.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            id={field.id}
            name={field.id}
            checked={formData[field.id] || false}
            onChange={(e) => handleChange(field.id, e.target.checked)}
          />
        );
      case "date":
        return <input type="date" {...commonProps} />;
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formValid = true;
    const newErrors = {};

    fields.forEach((field) => {
      const error = validateField(field, formData[field.id] || "");
      if (error) {
        formValid = false;
        newErrors[field.id] = error;
      }
    });

    setErrors(newErrors);

    if (formValid) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="text-xl font-semibold mb-4">Live Form Preview</h2>
      {fields.length === 0 && <p className="text-gray-500">No fields added yet.</p>}
      {fields.map((field) => (
        <div key={field.id} className="mb-4">
          <label htmlFor={field.id} className="block font-medium mb-1">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          {renderField(field)}
          {field.helpText && (
            <small id={`${field.id}-help`} className="block text-gray-500">
              {field.helpText}
            </small>
          )}
          {errors[field.id] &&
            Object.values(errors[field.id]).map((msg, i) => (
              <p key={i} className="text-red-500 text-sm mt-1">
                {msg}
              </p>
            ))}
        </div>
      ))}
      {fields.length > 0 && (
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      )}
    </form>
  );
}
