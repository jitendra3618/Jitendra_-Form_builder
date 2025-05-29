# Jitendra_-Form_builder
# 🛠️ Form Builder Application

This is a **Form Builder Web App** built using **React Remix** with **Tailwind CSS** and **Redux**. It enables users to easily create custom forms via drag-and-drop, preview them live, share the forms with others, and view collected responses.
![Screenshot (184)](https://github.com/user-attachments/assets/51e3f9a0-b620-4718-b366-45ae15ebdd4a)

![Screenshot (185)](https://github.com/user-attachments/assets/9b5c99ea-ba63-4d66-a5fe-1030d73e561e)

![Screenshot (186)](https://github.com/user-attachments/assets/6d8e206d-a006-4e87-a6fe-baaf36684a6b)

![Screenshot (187)](https://github.com/user-attachments/assets/09b22a1a-f957-4f74-851b-4410f9516461)
```

## 🚀 Tech Stack

- ⚛️ **React Remix** – For SSR and routing
- 🎨 **Tailwind CSS** – For styling
- 🗂 **Redux** – For global state management
- 🧠 **Context API** (Optional Alternative)
- 🧪 **Vite** – For fast bundling and development
- 💾 **Local Storage** – For saving form data (can be extended to DB)

---
## 📌 Features & Tasks

### 1. Drag-and-Drop Interface for Adding Components  
**Description:** Users can drag and drop various form fields like Text, Textarea, Dropdown, Checkbox, and Date into the form.  
**Implemented In:** `app/components/FormBuilder.jsx`, `app/components/DraggableField.jsx`

---

### 2. Reorder Fields Using Drag Actions  
**Description:** Fields can be rearranged within the form using drag-and-drop functionality.  
**Implemented In:** `app/components/FormBuilder.jsx`, `app/utils/dragUtils.js`

---

### 3. Field Configuration Panel  
**Description:**  
Each field supports configuration options such as:
- Label
- Placeholder
- Required
- Help Text
- Options (for Dropdowns)  
**Implemented In:** `app/components/FieldConfigPanel.jsx`, `app/redux/formSlice.js`

---

### 4. Real-Time Form Preview with Validations  
**Validations Supported:**
- Required fields
- Min/Max length
- Pattern matching (email/phone)  
**Implemented In:** `app/routes/preview.jsx`, `app/components/FormPreview.jsx`

---

### 5. Preview Modes  
**Description:** Switch between Desktop, Tablet, and Mobile views.  
**Implemented In:** `app/components/PreviewModeSwitcher.jsx`, `app/routes/preview.jsx`

---

### 6. Template Loading & Saving  
**Features:**
- Load predefined templates (e.g., Contact Us)
- Save custom templates (locally or via API)  
**Implemented In:** `app/utils/templateManager.js`, `app/components/TemplateLoader.jsx`

---

### 7. Multi-Step Form Functionality  
**Features:**
- Step-by-step navigation
- Validation on each step
- Visual progress indicator  
**Implemented In:** `app/components/MultiStepForm.jsx`, `app/routes/preview.jsx`

---

### 8. Shareable Form ID & Public View  
**Features:**
- Generate shareable form URL
- Load form by ID for public filling
- Forms stored in localStorage or backend  
**Implemented In:** `app/routes/form/$formId.jsx`, `app/utils/storage.js`

---

## 🌟 Bonus Tasks

### ✅ Auto-Save to Local Storage  
**Description:** Forms are auto-saved locally to prevent data loss.  
**Implemented In:** `app/utils/storage.js`, `app/redux/formSlice.js`

---

### ✅ View Submitted Responses  
**Features:**
- View submissions by form ID
- List of responses per form  
**Implemented In:** `app/routes/responses.jsx`, `app/utils/responseManager.js`

---

### ✅ Dark/Light Theme  
**Description:** Users can toggle between dark and light modes.  
**Implemented In:** `app/root.jsx`, `app/redux/formSlice.js`

---

### ✅ Undo/Redo Functionality  
**Description:** Easily revert or repeat recent changes made in form design.  
**Implemented In:** `app/utils/historyManager.js`, `app/components/UndoRedoButtons.jsx`

## ✅ Assignment Requirements & Implementations

| #  | Task Description                                          | Status     |
|----|-----------------------------------------------------------|------------|
| 1  | Drag-and-drop field creation                              | ✅ Done     |
| 2  | Real-time form preview                                    | ✅ Done     |
| 3  | Multi-step form support                                   | ✅ Done     |
| 4  | Shareable form (via URL or localStorage)                 | ✅ Done     |
| 5  | Store responses of submitted forms                        | ✅ Done     |
| 6  | View saved responses for each form                        | ✅ Done     |
| 7  | Toggle between dark and light mode                        | ✅ Done     |
| 8  | Responsive and modern UI with Tailwind                    | ✅ Done     |

---

## 🖼️ Features

- 📋 **Form Fields**: Text, Email, Number, Select, Date, etc.
- 📦 **Drag-and-Drop**: Easily rearrange form fields.
- 👁 **Live Preview**: Real-time rendering of the form.
- 🔗 **Sharable Link**: Persist the form structure via local storage.
- 📑 **Multi-step Forms**: Divide long forms into sections.
- 📊 **Response Viewer**: Review form submissions.
- 🌙 **Dark Mode**: Switch between dark and light themes.

---

## 📁 Project Structure

```bash
my-remix-app/
├── app/
│   ├── components/         # UI components (FormBuilder, Preview, etc.)
│   ├── routes/             # Remix route files
│   │   ├── index.jsx       # Home page with form builder
│   │   ├── preview.jsx     # Live preview of the form
│   │   └── responses.jsx   # View submitted responses
│   ├── redux/              # Redux store and slices
│   ├── styles/             # Tailwind and global CSS
│   └── root.jsx            # App root entry
├── public/                 # Static files
├── tailwind.config.js      # Tailwind config (JS version)
├── tailwind.config.ts      # Tailwind config (TS version, optional)
├── postcss.config.js       # PostCSS config
└── README.md               # You're here!
📦 Installation & Setup
bash
Copy
Edit
# 1. Clone the repo
git clone https://github.com/your-username/form-builder-remix.git
cd form-builder-remix

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
📸 Screenshots
Form Builder	Live Preview	Responses
✅ Screenshot	✅ Screenshot	✅ Screenshot

📚 Future Improvements
🔒 Add authentication (e.g., JWT or OAuth)

☁️ Connect to a backend (Node.js, Firebase, or Supabase)

📤 Export form as PDF or JSON

💬 Add validation rules and error messages

🧑‍💻 Author
Jitendra Kumar
Frontend Developer | React & Remix Enthusiast

📄 License
This project is licensed under the MIT License.








