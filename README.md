# Task Management Application

## 📌 Project Overview

This is a full-stack Task Management Application developed as the End-of-Course Project for the **Rapid Application Developer** course. The application allows users to manage tasks by creating, updating, deleting, and tracking them in a user-friendly interface.

This project implements:
- 🔐 JWT-based Authentication
- 🌐 RESTful APIs
- ⚛️ React with TypeScript frontend
- 🗃️ Redux + Redux Thunk for state management
- 🧩 Node.js + Express backend
- 🛠️ Prisma ORM with MySQL database

---

## 🔧 Technologies Used

### 📦 Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- MySQL
- JSON Web Tokens (JWT)

### 🖥️ Frontend
- React.js (with TypeScript)
- Redux
- Redux Thunk
- Axios
- Tailwind CSS (or any UI library used)

---

## 🔐 Features

### ✅ Authentication
- Register / Login with JWT token-based authentication
- Protected routes for authenticated users

### 📋 Task Management (CRUD)
- Create new tasks
- View list of tasks
- Update task status and details
- Delete tasks
- Relational logic (e.g., tasks assigned to specific users)

### 🌐 API Endpoints
All backend routes are prefixed with `/api/`.

Example:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

---

## ▶️ Getting Started

### 🚀 Prerequisites

- Node.js and npm
- MySQL installed and running
- (Optional) Prisma CLI

### 1️⃣ Backend Setup

- cd backend
- npm install
- npx prisma generate
- npx prisma migrate dev --name init
- npm run dev
- Make sure to set up a .env file in backend/:

- env
- Copy
- Edit
- DATABASE_URL="mysql://user:password@localhost:3306/task_db"
- JWT_SECRET="_jwt_secret_"
- 
### 2️⃣ Frontend Setup

- Copy
- Edit
- cd frontend
- npm install
- npm run dev

### 🌐 Deployment (Optional)

- Frontend can be deployed on Vercel :

- Backend can be deployed on Railway :


### 📝 Author & Course Info

- Name: Kavishka Prabashara Wijerathna



