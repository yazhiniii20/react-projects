# Notion Lite

A full-stack Notion-inspired notes application built with React, Express and MongoDB, focused on note organization, tag management and real-time UI interactions.

---

## ✨ Features

### 📝 Notes Management
- Create, edit and delete notes
- Persistent note storage with MongoDB
- Real-time UI updates after CRUD operations
- Pin and unpin important notes

### 🏷️ Tag System
- Add and remove tags dynamically
- Tag preview while typing
- Prevent duplicate tags
- Filter notes by tags

### 🔍 Search & Filtering
- Search notes by title and content
- Tag-based note filtering
- Pinned notes sorting

### ⚡ User Experience
- Loading indicators for API operations
- Error handling for failed requests
- Responsive and component-based UI
- Clean state synchronization between frontend and backend

---

## 🛠️ Frontend Technologies

- React
- useState
- useEffect
- Fetch API
- Component-based architecture
- Custom CSS

---

## 🛠️ Backend Technologies

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- CORS

---

## 🧠 Backend Architecture

The backend follows a modular and scalable structure:

- **Routes** → API endpoint definitions
- **Controllers** → Business logic handling
- **Models** → MongoDB schema definitions

---

## 🗄️ Database Features

- MongoDB Atlas cloud database integration
- Persistent data storage
- Full CRUD operations
- Mongoose schema modeling
- Async database operations
- REST API integration

---

## 🔌 API Endpoints

- `GET /notes` → Fetch all notes
- `POST /notes` → Create a new note
- `PUT /notes/:id` → Update an existing note
- `DELETE /notes/:id` → Delete a note

---

## 📚 What I Learned

- Building full-stack applications with React and Express
- Integrating MongoDB with Mongoose
- Managing frontend and backend state synchronization
- Designing RESTful APIs
- Structuring scalable backend architecture
- Handling asynchronous operations and API errors
- Debugging real-world integration issues
- Managing dynamic UI state efficiently

---

## 🚀 Future Improvements

- JWT Authentication
- User accounts and protected notes
- Rich text editor
- Drag-and-drop note organization
- Dark mode
- File/image attachments
- Note sharing and collaboration
