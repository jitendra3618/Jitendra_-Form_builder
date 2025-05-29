import React from "react";
import { useDispatch } from "react-redux";
import { loadTemplate } from "../redux/formSlice";

const exampleTemplates = {
  contactForm: [
    {
      id: "1",
      type: "text",
      label: "Name",
      required: true,
      placeholder: "Enter your full name",
      helpText: "Your full name",
      options: [],
      validation: { minLength: 2, maxLength: 50, pattern: "" },
    },
    {
      id: "2",
      type: "text",
      label: "Email",
      required: true,
      placeholder: "Enter your email",
      helpText: "We'll never share your email.",
      options: [],
      validation: {
        minLength: 5,
        maxLength: 100,
        pattern: "^\\S+@\\S+\\.\\S+$",
      },
    },
    {
      id: "3",
      type: "textarea",
      label: "Message",
      required: false,
      placeholder: "Your message here",
      helpText: "",
      options: [],
      validation: { minLength: 0, maxLength: 500, pattern: "" },
    },
  ],
  feedbackForm: [
    {
      id: "1",
      type: "dropdown",
      label: "Feedback Type",
      required: true,
      placeholder: "",
      helpText: "",
      options: ["Bug Report", "Feature Request", "Other"],
      validation: { minLength: 0, maxLength: 0, pattern: "" },
    },
    {
      id: "2",
      type: "textarea",
      label: "Details",
      required: true,
      placeholder: "Provide details here",
      helpText: "",
      options: [],
      validation: { minLength: 10, maxLength: 1000, pattern: "" },
    },
  ],
};

export default function Templates() {
  const dispatch = useDispatch();

  const handleLoadTemplate = (templateName) => {
    dispatch(loadTemplate(exampleTemplates[templateName]));
  };

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Load Template</h3>
      <button
        className="mr-2 mb-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        onClick={() => handleLoadTemplate("contactForm")}
      >
        Contact Form
      </button>
      <button
        className="mb-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        onClick={() => handleLoadTemplate("feedbackForm")}
      >
        Feedback Form
      </button>
    </div>
  );
}
