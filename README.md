# 📋 MERN Task Manager (DevOps Enabled)

A full-stack, production-ready Task Management web application built with the **MERN** stack (MongoDB, Express, React, Node.js), featuring **Docker** containerization and automated **CI/CD via Azure Pipelines**, deployed to **Azure App Service** through **Azure Container Registry**.

---

## ✨ Features

- **🔐 Authentication & Authorization:** User registration and login powered by JSON Web Tokens (JWT) and `bcryptjs` password hashing.
- **📝 Task Management (CRUD):** Create, read, update, and delete user-specific tasks with priorities and statuses.
- **🎨 Modern UI:** Fast, responsive frontend powered by React 19, Vite, and Tailwind CSS v4.
- **🐳 Containerized Architecture:** Multi-container setup with Docker & Docker Compose isolating MongoDB, Backend, and Frontend services, with custom networking between containers and persistent volumes for data storage.
- **☁️ Automated CI/CD on Azure:** Azure Pipelines automatically lints and builds the app, pushes Docker images to Azure Container Registry (ACR), and deploys to Azure App Service on every push.

---

## 🛠️ Tech Stack

| Category | Technology / Tool |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS v4, Axios, React Router v7 |
| **Backend** | Node.js, Express.js (v5), Mongoose (v9) |
| **Database** | MongoDB 6.0 |
| **Security** | JWT (jsonwebtoken), bcryptjs, CORS |
| **Containerization** | Docker, Docker Compose (custom networks, persistent volumes) |
| **CI/CD & Deployment** | Azure Pipelines, Azure Container Registry (ACR), Azure App Service |
| **Code Quality** | ESLint, Prettier |

---

## 📁 Project Structure

```text
task manager/
├── azure-pipelines.yml        # Azure Pipelines CI/CD definition
├── backend/
│   ├── config/                # Database connection config
│   ├── controllers/           # Auth & Task controller logic
│   ├── middleware/            # JWT authentication middleware
│   ├── models/                # Mongoose models (User, Task)
│   ├── routes/                # Express API routes
│   ├── .env                   # Backend environment variables
│   ├── dockerfile             # Docker container definition for Backend
│   ├── package.json           # Backend dependencies and scripts
│   └── server.js              # Express app entry point
├── frontend/
│   ├── src/                   # React components, pages, context, and styles
│   ├── dockerfile             # Docker container definition for Frontend
│   ├── package.json           # Frontend dependencies and scripts
│   └── vite.config.js         # Vite bundler configuration
├── docker-compose.yml         # Multi-service orchestration configuration (networks + volumes)
└── README.md                  # Project documentation
```

---

## ⚙️ Environment Variables

### Backend Configuration (`backend/.env`)

Create or update `backend/.env` with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/taskmanager
JWT_SECRET=your_jwt_secret_key_here
```

---

## 🚀 Quick Start Guide

You can run this application locally using **Docker Compose** (recommended) or manually via **Node.js**.

### Prerequisites

- [Node.js (v20+)](https://nodejs.org/)
- [Docker & Docker Compose](https://www.docker.com/) (For containerized deployment)
- [Git](https://git-scm.com/)

---

### Option 1: Run with Docker Compose (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zb-coderZ/Task-Manager-__DEVOPS__.git
   cd "task manager"
   ```

2. **Start all services:**
   ```bash
   docker compose up --build -d
   ```

3. **Access the application:**
   - **Frontend:** `http://localhost:5173`
   - **Backend API:** `http://localhost:5000`
   - **MongoDB:** running inside container at `mongodb://localhost:27017`

4. **Stop the services:**
   ```bash
   docker compose down
   ```

---

### Option 2: Run Manually (Local Development)

#### 1. Start MongoDB
Ensure MongoDB service is running locally on port `27017`. Update `MONGO_URI` in `backend/.env` to `mongodb://localhost:27017/taskmanager` if running natively.

#### 2. Start the Backend
```bash
cd backend
npm install
npm run dev # or node server.js
```
The backend server will run on `http://localhost:5000`.

#### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend dev server will run on `http://localhost:5173`.

---

## 📡 API Endpoints Summary

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | ❌ No |
| `POST` | `/api/auth/login` | Authenticate user & get token | ❌ No |

### Task Routes (`/api/tasks`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks` | Get all tasks for authenticated user | 🔒 Yes |
| `POST` | `/api/tasks` | Create a new task | 🔒 Yes |
| `PUT` | `/api/tasks/:id` | Update an existing task | 🔒 Yes |
| `DELETE` | `/api/tasks/:id` | Delete a task | 🔒 Yes |

---

## 🔄 CI/CD & Deployment Pipeline (Azure Pipelines)

This repository includes a preconfigured Azure Pipelines definition (`azure-pipelines.yml`):

1. **Continuous Integration (CI):**
   - Triggers on push or PR to `Main` and `dev` branches.
   - Installs dependencies for backend and frontend.
   - Runs ESLint checks on both subprojects.
   - Builds Docker images for the backend and frontend to validate the Dockerfiles.

2. **Continuous Delivery (Push to ACR):**
   - On a successful build, tags the Docker images and pushes them to **Azure Container Registry (ACR)**.

3. **Continuous Deployment (Deploy to Azure App Service):**
   - Executes automatically on direct push to `Main`.
   - Pulls the latest images from ACR and deploys them to **Azure App Service** using Azure service connection credentials configured in the pipeline.
   - No manual SSH or server access required — deployment is fully managed by Azure App Service.

---

## 🐳 Docker Networking & Volumes

- Backend, frontend, and MongoDB run as isolated services on a custom Docker Compose network, so containers communicate by service name rather than exposed host ports.
- MongoDB data is persisted with a named Docker volume, so data survives container restarts and rebuilds.

---

## 🧪 Code Quality Commands

### Backend
```bash
cd backend
npm run lint       # Run ESLint check
npm run lint:fix   # Fix ESLint errors automatically
npm run format     # Format code with Prettier
```

### Frontend
```bash
cd frontend
npm run lint       # Run ESLint check
npm run lint:fix   # Fix ESLint errors automatically
npm run format     # Format code with Prettier
```

---

## ✅ CodeAlpha DevOps Internship — Task Coverage

This project covers **2 of the 4** internship tasks:

- **Task 1: CI/CD Pipeline using Azure**:
 Azure Pipelines builds and tests the app, pushes images to Azure Container Registry, and deploys to Azure App Service.
 
- **Task 2: Web Server using Docker**:
Full Docker Compose setup with custom networking and persistent volumes across backend, frontend, and MongoDB services.

- **TASK 3: Jenkins Remoting Project**:
Discussed the concept of Jenkins Remoting (Distributed Builds) — connecting remote agent nodes to a central Jenkins controller.
Covered the core idea: builds run on separate machines instead of just the controller, so workloads get distributed across nodes securely.
Discussed running jobs on different architectures/OS (Linux, Windows, ARM) using remote nodes.
Covered node isolation as a security practice — running sensitive builds only on designated nodes.
Talked through the general setup flow: configure an agent (via SSH, JNLP, or Docker agent) → attach it under Manage Jenkins → Nodes → assign jobs to nodes using labels.