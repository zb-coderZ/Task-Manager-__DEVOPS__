# MERN Task Manager - Frontend

A professional React frontend for the MERN Task Manager application.

This project focuses on building a complete full-stack workflow:
- React frontend communication with Express backend
- JWT authentication
- Protected routes
- CRUD task management

---

# Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios

## Backend Connection

- Node.js + Express API
- MongoDB Atlas
- JWT Authentication

---

# Project Structure

```

src
│
├── components
│   ├── ProtectedRoute.jsx
│   ├── Navbar.jsx
│   ├── TaskCard.jsx
│   └── TaskForm.jsx
│
├── pages
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Dashboard.jsx
│
├── services
│   └── api.js
│
├── context
│   └── AuthContext.jsx
│
├── utils
│   └── token.js
│
├── App.jsx
├── main.jsx
└── index.css

```

---

# Completed Features

## 1. React Project Setup

Created React application using Vite.

Configured:

- React
- Tailwind CSS
- React Router

---

# 2. React Router Setup

Implemented routing:

```

/login
/register
/dashboard

```

Application flow:

```

URL
|
↓
React Router
|
↓
Page Component

```

---

# 3. Axios API Configuration

Created centralized API service:

```

src/services/api.js

````

Purpose:

- Connect React with Express backend
- Avoid repeating API URLs
- Automatically attach JWT token

Example:

```javascript
API.get("/tasks")
````

instead of:

```javascript
axios.get(
"http://localhost:5000/api/tasks"
)
```

---

# 4. CORS Connection

Connected frontend:

```
React
localhost:5173
```

with backend:

```
Express
localhost:5000
```

Configured CORS in Express.

---

# 5. Token Handling

Created:

```
utils/token.js
```

Handles:

* Save JWT token
* Get JWT token
* Remove JWT token

Functions:

```javascript
setToken()

getToken()

removeToken()
```

---

# 6. Authentication Context

Created:

```
context/AuthContext.jsx
```

Global authentication management.

Handles:

* Register user
* Login user
* Logout user
* Store authentication state

Flow:

```
Component

   ↓

AuthContext

   ↓

API Service

   ↓

Backend
```

---

# 7. User Registration

Created Register page:

```
pages/Register.jsx
```

Features:

* Name input
* Email input
* Password input
* Form handling
* Backend API connection

API:

```
POST /api/auth/register
```

Flow:

```
Register Form

↓

AuthContext

↓

Express Controller

↓

MongoDB User Created
```

---

# 8. User Login

Created Login page:

```
pages/Login.jsx
```

Features:

* Email login
* Password authentication
* JWT token receiving
* Token storage

API:

```
POST /api/auth/login
```

Flow:

```
Login

↓

Backend verifies password

↓

JWT generated

↓

Stored in localStorage
```

---

# 9. Protected Routes

Created:

```
components/ProtectedRoute.jsx
```

Purpose:

Prevent unauthorized dashboard access.

Flow:

```
Open Dashboard

       ↓

Check JWT Token

       ↓

Token exists?

Yes → Dashboard

No → Login
```

---

# 10. Dashboard Task Fetching

Created:

```
pages/Dashboard.jsx
```

Connected:

```
GET /api/tasks
```

Features:

* Fetch logged-in user's tasks
* Display task data
* JWT automatically attached

Flow:

```
Dashboard

↓

Axios Request

↓

JWT Middleware

↓

Task Controller

↓

MongoDB
```

---

# 11. Task Creation

Created:

```
components/TaskForm.jsx
```

Features:

* Create new tasks
* Title
* Description
* Priority

API:

```
POST /api/tasks
```

Flow:

```
Task Form

↓

API Request

↓

Express

↓

MongoDB

↓

Refresh Dashboard
```

---

# Current Status

Frontend:

```
Authentication:
✅ Register
✅ Login
✅ JWT Storage
✅ Protected Routes


Task System:
✅ Fetch Tasks
✅ Create Tasks


Remaining:
⬜ Display task cards UI
⬜ Update task
⬜ Delete task
⬜ Logout button
⬜ Premium dashboard design
⬜ Loading states
⬜ Error handling
```

---

# Application Flow

```
React Frontend

      |
      |
      ↓

Axios API Service

      |
      |
      ↓

Express Backend

      |
      |
      ↓

JWT Middleware

      |
      |
      ↓

Controllers

      |
      |
      ↓

MongoDB Atlas
```

---

# How to Run Frontend

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend runs:

```
http://localhost:5173
```

Backend runs:

```
http://localhost:5000
```

---

# Next Development Steps

1. Create TaskCard component
2. Add Update Task functionality
3. Add Delete Task functionality
4. Add Navbar with Logout
5. Improve UI with premium Tailwind design
6. Add loading and error states
