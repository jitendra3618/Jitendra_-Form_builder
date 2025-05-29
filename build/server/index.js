import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { useSensors, useSensor, PointerSensor, KeyboardSensor, DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const initialState = {
  fields: [],
  past: [],
  future: [],
  theme: "light"
};
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addField: (state, action) => {
      state.past.push(state.fields);
      state.future = [];
      state.fields = [
        ...state.fields,
        { ...action.payload, id: nanoid() }
      ];
    },
    updateField: (state, action) => {
      state.past.push(state.fields);
      state.future = [];
      state.fields = state.fields.map(
        (field) => field.id === action.payload.id ? { ...field, ...action.payload.updates } : field
      );
    },
    removeField: (state, action) => {
      state.past.push(state.fields);
      state.future = [];
      state.fields = state.fields.filter((field) => field.id !== action.payload);
    },
    reorderFields: (state, action) => {
      state.past.push(state.fields);
      state.future = [];
      state.fields = action.payload;
    },
    loadTemplate: (state, action) => {
      state.past.push(state.fields);
      state.future = [];
      state.fields = action.payload.map((field) => ({
        ...field,
        id: nanoid()
      }));
    },
    undo: (state) => {
      if (state.past.length > 0) {
        const previous = state.past.pop();
        state.future.push(state.fields);
        state.fields = previous;
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const next = state.future.pop();
        state.past.push(state.fields);
        state.fields = next;
      }
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    }
  }
});
const {
  addField,
  updateField,
  removeField,
  reorderFields,
  loadTemplate,
  undo,
  redo,
  toggleTheme
} = formSlice.actions;
const formReducer = formSlice.reducer;
const store = configureStore({
  reducer: {
    form: formReducer
  }
});
function App() {
  return /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ jsx("title", { children: "Form Builder" })
    ] }),
    /* @__PURE__ */ jsx("body", { className: "bg-gray-100 min-h-screen text-gray-900", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] }) });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
function ResponsesPage() {
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-md shadow-md", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold mb-4", children: "Form Responses" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300", children: "This page will display submitted responses once the form submission is wired up." })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResponsesPage
}, Symbol.toStringTag, { value: "Module" }));
function PreviewForm() {
  const fields = useSelector((state) => state.form.fields);
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-md shadow-md", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold mb-4", children: "Form Preview" }),
    /* @__PURE__ */ jsx("form", { className: "space-y-4", children: fields.map((field, index) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("label", { className: "block font-medium mb-1", children: [
        field.label,
        field.required && /* @__PURE__ */ jsx("span", { className: "text-red-500 ml-1", children: "*" })
      ] }),
      field.type === "text" && /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          className: "w-full border px-3 py-2 rounded",
          placeholder: field.placeholder,
          required: field.required
        }
      ),
      field.type === "textarea" && /* @__PURE__ */ jsx(
        "textarea",
        {
          className: "w-full border px-3 py-2 rounded",
          placeholder: field.placeholder,
          required: field.required
        }
      ),
      field.type === "checkbox" && /* @__PURE__ */ jsx("div", { children: field.options.map((option, i) => /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center mr-4", children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", className: "mr-1" }),
        option
      ] }, i)) }),
      field.type === "radio" && /* @__PURE__ */ jsx("div", { children: field.options.map((option, i) => /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center mr-4", children: [
        /* @__PURE__ */ jsx("input", { type: "radio", name: `radio-${index}`, className: "mr-1" }),
        option
      ] }, i)) })
    ] }, index)) })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PreviewForm
}, Symbol.toStringTag, { value: "Module" }));
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
    userSelect: "none"
  };
  return /* @__PURE__ */ jsx("div", { ref: setNodeRef, style, ...attributes, ...listeners, children: label });
}
function FormBuilder() {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.form.fields);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: void 0
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
      options: type === "dropdown" ? ["Option 1", "Option 2"] : []
    };
    dispatch(addField(newField));
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-4 flex space-x-2", children: ["text", "textarea", "dropdown", "checkbox", "date"].map((type) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => addNewField(type),
        className: "px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700",
        children: [
          "Add ",
          type.charAt(0).toUpperCase() + type.slice(1)
        ]
      },
      type
    )) }),
    /* @__PURE__ */ jsx(
      DndContext,
      {
        sensors,
        collisionDetection: closestCenter,
        onDragEnd: handleDragEnd,
        children: /* @__PURE__ */ jsx(
          SortableContext,
          {
            items: fields.map((f) => f.id),
            strategy: verticalListSortingStrategy,
            children: fields.map((field) => /* @__PURE__ */ jsx(SortableField, { id: field.id, label: field.label }, field.id))
          }
        )
      }
    )
  ] });
}
function FormPreview() {
  const fields = useSelector((state) => state.form.fields);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const validateField = (field, value) => {
    const err = {};
    if (field.required && (!value || value.trim() === "")) {
      err.required = "This field is required";
    }
    if (field.validation.minLength && value.length < field.validation.minLength) {
      err.minLength = `Minimum length is ${field.validation.minLength}`;
    }
    if (field.validation.maxLength && value.length > field.validation.maxLength) {
      err.maxLength = `Maximum length is ${field.validation.maxLength}`;
    }
    if (field.validation.pattern) {
      try {
        const regex = new RegExp(field.validation.pattern);
        if (!regex.test(value)) {
          err.pattern = "Invalid format";
        }
      } catch {
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
      className: "w-full border rounded px-2 py-1 " + (error ? "border-red-500" : "border-gray-300"),
      "aria-describedby": `${field.id}-help`
    };
    switch (field.type) {
      case "text":
        return /* @__PURE__ */ jsx("input", { type: "text", ...commonProps });
      case "textarea":
        return /* @__PURE__ */ jsx("textarea", { ...commonProps, rows: 4 });
      case "dropdown":
        return /* @__PURE__ */ jsxs(
          "select",
          {
            ...commonProps,
            onChange: (e) => handleChange(field.id, e.target.value),
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select an option" }),
              field.options.map((opt, i) => /* @__PURE__ */ jsx("option", { value: opt, children: opt }, i))
            ]
          }
        );
      case "checkbox":
        return /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            id: field.id,
            name: field.id,
            checked: formData[field.id] || false,
            onChange: (e) => handleChange(field.id, e.target.checked)
          }
        );
      case "date":
        return /* @__PURE__ */ jsx("input", { type: "date", ...commonProps });
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
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, noValidate: true, children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Live Form Preview" }),
    fields.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "No fields added yet." }),
    fields.map((field) => /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxs("label", { htmlFor: field.id, className: "block font-medium mb-1", children: [
        field.label,
        " ",
        field.required && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
      ] }),
      renderField(field),
      field.helpText && /* @__PURE__ */ jsx("small", { id: `${field.id}-help`, className: "block text-gray-500", children: field.helpText }),
      errors[field.id] && Object.values(errors[field.id]).map((msg, i) => /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: msg }, i))
    ] }, field.id)),
    fields.length > 0 && /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        className: "bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700",
        children: "Submit"
      }
    )
  ] });
}
function ThemeToggle({ theme, onToggle }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: onToggle,
      className: "px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded",
      children: theme === "dark" ? "Light Mode" : "Dark Mode"
    }
  );
}
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
      validation: { minLength: 2, maxLength: 50, pattern: "" }
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
        pattern: "^\\S+@\\S+\\.\\S+$"
      }
    },
    {
      id: "3",
      type: "textarea",
      label: "Message",
      required: false,
      placeholder: "Your message here",
      helpText: "",
      options: [],
      validation: { minLength: 0, maxLength: 500, pattern: "" }
    }
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
      validation: { minLength: 0, maxLength: 0, pattern: "" }
    },
    {
      id: "2",
      type: "textarea",
      label: "Details",
      required: true,
      placeholder: "Provide details here",
      helpText: "",
      options: [],
      validation: { minLength: 10, maxLength: 1e3, pattern: "" }
    }
  ]
};
function Templates() {
  const dispatch = useDispatch();
  const handleLoadTemplate = (templateName) => {
    dispatch(loadTemplate(exampleTemplates[templateName]));
  };
  return /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
    /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "Load Template" }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "mr-2 mb-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700",
        onClick: () => handleLoadTemplate("contactForm"),
        children: "Contact Form"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "mb-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700",
        onClick: () => handleLoadTemplate("feedbackForm"),
        children: "Feedback Form"
      }
    )
  ] });
}
function Index() {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.form.fields);
  const theme = useSelector((state) => state.form.theme);
  useEffect(() => {
    const saved = localStorage.getItem("formFields");
    if (saved) {
      dispatch(loadTemplate(JSON.parse(saved)));
    }
  }, []);
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
        pattern: ""
      }
    };
    dispatch(addField(newField));
  };
  const handleUndo = () => {
    dispatch(undo());
  };
  const handleRedo = () => {
    dispatch(redo());
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-4 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Form Builder" }),
      /* @__PURE__ */ jsx(
        ThemeToggle,
        {
          theme,
          onToggle: () => dispatch(toggleTheme())
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex space-x-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-1/3 border p-4 rounded shadow", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: "Add Fields" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col space-y-2", children: ["text", "textarea", "dropdown", "checkbox", "date"].map((type) => /* @__PURE__ */ jsxs(
          "button",
          {
            className: "bg-blue-600 text-white py-2 rounded hover:bg-blue-700",
            onClick: () => handleAddField(type),
            children: [
              "Add ",
              type.charAt(0).toUpperCase() + type.slice(1)
            ]
          },
          type
        )) }),
        /* @__PURE__ */ jsx(Templates, {}),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 space-x-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleUndo,
              className: "bg-gray-300 px-3 py-1 rounded hover:bg-gray-400",
              children: "Undo"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleRedo,
              className: "bg-gray-300 px-3 py-1 rounded hover:bg-gray-400",
              children: "Redo"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-1/3 border p-4 rounded shadow overflow-auto max-h-[80vh]", children: /* @__PURE__ */ jsx(FormBuilder, {}) }),
      /* @__PURE__ */ jsx("div", { className: "w-1/3 border p-4 rounded shadow overflow-auto max-h-[80vh]", children: /* @__PURE__ */ jsx(FormPreview, {}) })
    ] })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-C-c3aHfQ.js", "imports": ["/assets/index-D0EyjebO.js", "/assets/index-CnCQLWBH.js", "/assets/index-ejVXRMEg.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DUIWTN7K.js", "imports": ["/assets/index-D0EyjebO.js", "/assets/index-CnCQLWBH.js", "/assets/index-ejVXRMEg.js", "/assets/index-BOePO-Vi.js", "/assets/formSlice-DwJQCDQr.js"], "css": ["/assets/root-CkVYxSam.css"] }, "routes/responses": { "id": "routes/responses", "parentId": "root", "path": "responses", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/responses-BA9vpQ3M.js", "imports": ["/assets/index-D0EyjebO.js"], "css": [] }, "routes/preview": { "id": "routes/preview", "parentId": "root", "path": "preview", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/preview-CKg3aTFY.js", "imports": ["/assets/index-D0EyjebO.js", "/assets/index-BOePO-Vi.js", "/assets/index-CnCQLWBH.js"], "css": [] }, "routes/index": { "id": "routes/index", "parentId": "root", "path": "index", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DVFb3rFY.js", "imports": ["/assets/index-D0EyjebO.js", "/assets/index-BOePO-Vi.js", "/assets/formSlice-DwJQCDQr.js", "/assets/index-CnCQLWBH.js"], "css": [] } }, "url": "/assets/manifest-c6739624.js", "version": "c6739624" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/responses": {
    id: "routes/responses",
    parentId: "root",
    path: "responses",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/preview": {
    id: "routes/preview",
    parentId: "root",
    path: "preview",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: "index",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
