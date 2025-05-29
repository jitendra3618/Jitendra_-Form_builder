// app/routes/preview.jsx

import React from "react";
import { useSelector } from "react-redux";

export default function PreviewForm() {
  const fields = useSelector((state) => state.form.fields);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Form Preview</h1>
      <form className="space-y-4">
        {fields.map((field, index) => (
          <div key={index}>
            <label className="block font-medium mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {field.type === "text" && (
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                placeholder={field.placeholder}
                required={field.required}
              />
            )}

            {field.type === "textarea" && (
              <textarea
                className="w-full border px-3 py-2 rounded"
                placeholder={field.placeholder}
                required={field.required}
              />
            )}

            {field.type === "checkbox" && (
              <div>
                {field.options.map((option, i) => (
                  <label key={i} className="inline-flex items-center mr-4">
                    <input type="checkbox" className="mr-1" />
                    {option}
                  </label>
                ))}
              </div>
            )}

            {field.type === "radio" && (
              <div>
                {field.options.map((option, i) => (
                  <label key={i} className="inline-flex items-center mr-4">
                    <input type="radio" name={`radio-${index}`} className="mr-1" />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </form>
    </div>
  );
}
