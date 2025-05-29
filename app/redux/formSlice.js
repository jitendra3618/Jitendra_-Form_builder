import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  fields: [],
  past: [],
  future: [],
  theme: "light",
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
        { ...action.payload, id: nanoid() },
      ];
    },
    updateField: (state, action) => {
      state.past.push(state.fields);
      state.future = [];
      state.fields = state.fields.map((field) =>
        field.id === action.payload.id
          ? { ...field, ...action.payload.updates }
          : field
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
        id: nanoid(),
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
    },
  },
});

export const {
  addField,
  updateField,
  removeField,
  reorderFields,
  loadTemplate,
  undo,
  redo,
  toggleTheme,
} = formSlice.actions;
export default formSlice.reducer;
