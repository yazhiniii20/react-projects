# 🧠 Notion Lite

A full-stack Notion-inspired knowledge management application built with React, Express and MongoDB.

The project focuses on scalable frontend architecture, secure backend development, authentication workflows and real-time note organization with persistent cloud storage.

---

# 🚀 Features

## 📝 Notes Management
- Create, edit and delete notes
- Persistent cloud storage using MongoDB Atlas
- Real-time UI updates after CRUD operations
- Pin and unpin important notes
- Protected note operations using JWT authentication

---

## 🏷️ Tag System
- Dynamic tag creation and removal
- Tag preview while typing
- Duplicate tag prevention
- Filter notes using tags
- Interactive tag-based navigation

---

## 🔍 Search & Filtering
- Search notes by title and content
- Instant filtering with dynamic rendering
- Pinned notes prioritization
- Organized note grouping

---

## 🔐 Authentication & Security
- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Authorization middleware
- Secure token verification flow

---

## ⚡ User Experience
- Responsive component-based UI
- Loading indicators for async operations
- Error handling for failed API requests
- Smooth frontend-backend synchronization
- Real-time state updates

---

# 🛠️ Tech Stack

## Frontend
- React
- JavaScript (ES6+)
- useState
- useEffect
- Fetch API
- CSS3

---

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt
- dotenv
- CORS

---

# 🧠 Backend Architecture

The backend follows a modular and scalable architecture:

```text
routes/       → API endpoint definitions
controllers/  → Business logic
models/       → MongoDB schemas
middleware/   → Authentication & route protection
```

---

# 🔌 REST API Endpoints

## Authentication
- `POST /auth/register` → Register new user
- `POST /auth/login` → Authenticate user and generate JWT

## Notes
- `GET /notes` → Fetch user notes
- `POST /notes` → Create note
- `PUT /notes/:id` → Update note
- `DELETE /notes/:id` → Delete note

---

# 🗄️ Database Features

- MongoDB Atlas cloud integration
- Persistent note storage
- Full CRUD operations
- Mongoose schema modeling
- Async database handling
- Secure user authentication storage

---

# 📚 Key Concepts Practiced

- Full-stack application development
- REST API architecture
- MongoDB integration with Mongoose
- JWT authentication workflows
- Password hashing and backend security
- Protected API route handling
- Frontend and backend state synchronization
- Scalable backend folder structuring
- Dynamic UI rendering in React
- Error handling and async operations

---

# 🚀 Future Improvements

- Rich text editor
- Drag-and-drop note organization
- Dark mode support
- File and image attachments
- Collaborative note sharing
- Folder and workspace support
- Note archiving and trash system
- Markdown support
- Deployment with CI/CD

---

# 📌 Project Status

🚧 Active Development  
New features and backend improvements are continuously being added to improve scalability, security and user experience.
