# Jitendra_-Form_builder
# 🛠️ Form Builder Application

This is a **Form Builder Web App** built using **React Remix** with **Tailwind CSS** and **Redux**. It enables users to easily create custom forms via drag-and-drop, preview them live, share the forms with others, and view collected responses.
## Screenshots📸
![Screenshot (184)](https://github.com/user-attachments/assets/bcc0a491-c7a7-4c62-a856-a5c72704aa7b)
![Screenshot (185)](https://github.com/user-attachments/assets/ada7fdb0-9c5e-4faa-9aa3-faa1e4a222c0)
![Screenshot (186)](https://github.com/user-attachments/assets/47492d71-c39c-42d3-bfd0-ce68ef3fe045)
![Screenshot (187)](https://github.com/user-attachments/assets/b2db7367-f685-47cd-afec-84a4b079bf91)


---

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

```
📦 Installation & Setup
bash
Copy
Edit
# 1. Clone the repository
git clone https://github.com/your-username/Jitendra_-Form_builder.git

# 2. Install dependencies
cd my-remix-app <br>
npm install <br>
npm run dev <br>

# 3. Run the development server
npm run dev


📚 Future Improvements<br>
🔒 Add authentication (e.g., JWT or OAuth)<br>

☁️ Connect to a backend (Node.js, Firebase, or Supabase)<br>

📤 Export form as PDF or JSON<br>

💬 Add validation rules and error messages<br>

🧑‍💻 Author<br>
Jitendra Kumar <br>
Frontend Developer | React & Remix Enthusiast

📄 License<br>
This project is licensed under the MIT License.








