// MultiStepForm.jsx
import { useState } from "react";
import { useSelector } from "react-redux";

export default function MultiStepForm() {
  const fields = useSelector((state) => state.form.fields);
  const [step, setStep] = useState(0);

  const fieldsPerStep = 2;
  const steps = Math.ceil(fields.length / fieldsPerStep);
  const currentFields = fields.slice(step * fieldsPerStep, (step + 1) * fieldsPerStep);

  const nextStep = () => setStep((s) => Math.min(s + 1, steps - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="p-4 bg-white">
      <h2 className="font-bold text-lg mb-4">Multi-Step Form</h2>
      <form className="space-y-4">
        {currentFields.map((field, i) => (
          <div key={i}>
            <label className="block mb-1">{field.label || field.type}</label>
            {field.type === "text" && <input className="border p-2 w-full" />}
            {field.type === "textarea" && <textarea className="border p-2 w-full" />}
            {field.type === "checkbox" && <input type="checkbox" />}
            {field.type === "dropdown" && (
              <select className="border p-2 w-full">
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            )}
            {field.type === "date" && <input type="date" className="border p-2 w-full" />}
          </div>
        ))}
        <div className="flex justify-between pt-4">
          <button type="button" onClick={prevStep} className="bg-gray-200 px-4 py-2 rounded">
            Previous
          </button>
          <span className="text-sm self-center">Step {step + 1} of {steps}</span>
          <button type="button" onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
