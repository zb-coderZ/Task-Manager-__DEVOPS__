# 📋 MERN Task Manager (DevOps Enabled)

A full-stack, production-ready Task Management web application built with the **MERN** stack (MongoDB, Express, React, Node.js), featuring **Docker** containerization, **Kubernetes deployment with Minikube**, automated **CI/CD via Azure Pipelines**, and deployment to **Azure App Service** through **Azure Container Registry**.

---

## ✨ Features

- **🔐 Authentication & Authorization:** User registration and login powered by JSON Web Tokens (JWT) and `bcryptjs` password hashing.
- **📝 Task Management (CRUD):** Create, read, update, and delete user-specific tasks with priorities and statuses.
- **🎨 Modern UI:** Fast, responsive frontend powered by React 19, Vite, and Tailwind CSS v4.
- **🐳 Containerized Architecture:** Multi-container setup with Docker & Docker Compose isolating MongoDB, Backend, and Frontend services, with custom networking between containers and persistent volumes for data storage.
- **☸️ Kubernetes Deployment:** Application services are deployed to a local Kubernetes cluster using Minikube, with separate Deployments and Services for MongoDB, Backend, and Frontend.
- **🌐 Nginx Reverse Proxy:** Nginx is configured as the public entry point, serving the frontend and routing `/api` requests to the backend through a single port.
- **☁️ Automated CI/CD:** Azure Pipelines handles cloud deployment, while Jenkins checks out the code, builds the Docker images, starts the Docker Compose services, and collects container logs for validation and troubleshooting.

---

## 🛠️ Tech Stack

| Category | Technology / Tool |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS v4, Axios, React Router v7 |
| **Backend** | Node.js, Express.js (v5), Mongoose (v9) |
| **Database** | MongoDB 6.0 |
| **Security** | JWT (jsonwebtoken), bcryptjs, CORS |
| **Containerization** | Docker, Docker Compose (custom networks, persistent volumes) |
| **Orchestration** | Kubernetes, Minikube |
| **Web Server / Proxy** | Nginx (reverse proxy and request routing) |
| **CI/CD & Deployment** | Jenkins, Azure Pipelines, Azure Container Registry (ACR), Azure App Service |
| **Code Quality** | ESLint, Prettier |

---

## 📁 Project Structure

```text
task manager/
├── azure-pipelines.yml          # Azure Pipelines CI/CD definition
├── Jenkinsfile                  # Jenkins Docker build and Compose pipeline
├── k8s/
│   ├── 00-namespace.yaml        # Kubernetes namespace
│   ├── 01-mongo.yaml            # MongoDB Deployment + Service
│   ├── 02-backend.yaml          # Backend Deployment + Service
│   └── 03-frontend.yaml         # Frontend Deployment + NodePort Service
├── backend/
│   ├── config/                  # Database connection config
│   ├── controllers/             # Auth & Task controller logic
│   ├── middleware/              # JWT authentication middleware
│   ├── models/                  # Mongoose models (User, Task)
│   ├── routes/                  # Express API routes
│   ├── .env                     # Backend environment variables
│   ├── dockerfile               # Docker container definition for Backend
│   ├── package.json             # Backend dependencies and scripts
│   └── server.js                # Express app entry point
├── frontend/
│   ├── src/                     # React components, pages, context, and styles
│   ├── dockerfile               # Docker container definition for Frontend
│   ├── package.json             # Frontend dependencies and scripts
│   └── vite.config.js           # Vite bundler configuration
├── docker-compose.yml            # Multi-service orchestration configuration
├── nginx/
│   └── nginx.conf               # Nginx reverse proxy and health-check configuration
└── README.md                    # Project documentation
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

### Kubernetes Configuration

For the Minikube deployment, the backend receives the MongoDB connection through the Kubernetes MongoDB Service:

```text
mongodb://mongo:27017/taskdb
```

The JWT secret is provided to the backend through a Kubernetes Secret rather than storing it directly in the Deployment configuration.

The Kubernetes Secret can be created with:

```bash
kubectl -n devops-part3 create secret generic app-secret \
  --from-literal=JWT_SECRET="your_jwt_secret"
```

> **Note:** Do not commit real secrets to GitHub. Use Kubernetes Secrets or another secure secret-management solution for sensitive values.

---

## 🚀 Quick Start Guide

You can run this application locally using **Docker Compose**, manually using **Node.js**, or deploy it to a local Kubernetes cluster using **Minikube**.

### Prerequisites

- Node.js (v20+)
- Docker & Docker Compose
- Git
- Kubernetes / Minikube (for Kubernetes deployment)

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

- **Application through Nginx:** `http://localhost`
- **Backend API through Nginx:** `http://localhost/api`
- **Nginx health check:** `http://localhost/nginx-health`
- **MongoDB:** running inside the container at `mongodb://localhost:27017`

4. **Stop the services:**

```bash
docker compose down
```

---

### Option 2: Run Manually (Local Development)

#### 1. Start MongoDB

Ensure MongoDB service is running locally on port `27017`. Update `MONGO_URI` in `backend/.env` to:

```env
MONGO_URI=mongodb://localhost:27017/taskmanager
```

if running MongoDB natively.

#### 2. Start the Backend

```bash
cd backend
npm install
npm run dev
```

or:

```bash
node server.js
```

The backend server will run on `http://localhost:5000`.

#### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend development server will run on `http://localhost:5173`.

---

## ☸️ Kubernetes Deployment with Minikube

The application can also be deployed as a multi-tier application on a local Kubernetes cluster using **Minikube**.

### Kubernetes Architecture

```text
                    ┌─────────────────────┐
                    │      Browser        │
                    └──────────┬──────────┘
                               │
                               │ NodePort
                               ▼
                    ┌─────────────────────┐
                    │ Frontend Service    │
                    │     NodePort        │
                    │      :32545         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Frontend Pod        │
                    │ React + Vite        │
                    └─────────────────────┘

                    ┌─────────────────────┐
                    │ Backend Service     │
                    │     ClusterIP       │
                    │       :5000         │
                    └──────────┬──────────┘
                               │
                         ┌─────┴─────┐
                         ▼           ▼
                    Backend Pod  Backend Pod
                       :5000         :5000
                         │
                         ▼
                    ┌─────────────────────┐
                    │ MongoDB Service     │
                    │     ClusterIP       │
                    │      :27017         │
                    └──────────┬──────────┘
                               │
                               ▼
                         MongoDB Pod
```

### Kubernetes Resources

The deployment uses the `devops-part3` namespace.

| Resource | Type | Purpose |
| :--- | :--- | :--- |
| `devops-part3` | Namespace | Isolates the project resources |
| `mongo` | Deployment | Runs MongoDB |
| `mongo` | ClusterIP Service | Provides internal MongoDB networking |
| `backend` | Deployment | Runs 2 backend replicas |
| `backend` | ClusterIP Service | Provides internal backend networking |
| `frontend` | Deployment | Runs the React frontend |
| `frontend` | NodePort Service | Exposes frontend outside the cluster |
| `app-secret` | Secret | Provides JWT secret securely to backend |

### Kubernetes Deployment Files

```text
k8s/
├── 00-namespace.yaml
├── 01-mongo.yaml
├── 02-backend.yaml
└── 03-frontend.yaml
```

### 1. Create the Namespace

```bash
kubectl apply -f k8s/00-namespace.yaml
```

### 2. Deploy MongoDB

```bash
kubectl apply -f k8s/01-mongo.yaml
```

MongoDB is exposed internally using a `ClusterIP` Service:

```text
mongo:27017
```

The backend connects to MongoDB through the Kubernetes Service name rather than using the Pod IP.

### 3. Create the Backend Secret

```bash
kubectl -n devops-part3 create secret generic app-secret \
  --from-literal=JWT_SECRET="your_jwt_secret"
```

### 4. Deploy the Backend

```bash
kubectl apply -f k8s/02-backend.yaml
```

The backend is configured with:

```text
MONGO_URI=mongodb://mongo:27017/taskdb
```

and receives `JWT_SECRET` from the Kubernetes Secret.

The backend Deployment uses **2 replicas** for basic redundancy and load distribution.

### 5. Deploy the Frontend

```bash
kubectl apply -f k8s/03-frontend.yaml
```

The frontend is exposed using a `NodePort` Service.

Example:

```text
5173:32545/TCP
```

The exact NodePort can vary depending on the Kubernetes configuration.

### 6. Verify the Deployment

Check all Pods:

```bash
kubectl -n devops-part3 get pods
```

Check Services:

```bash
kubectl -n devops-part3 get svc
```

Check backend replicas:

```bash
kubectl -n devops-part3 get pods -l app=backend
```

Check frontend:

```bash
kubectl -n devops-part3 get pods -l app=frontend
```

### 7. Access the Frontend

The frontend can be opened through Minikube:

```bash
minikube service frontend -n devops-part3
```

For local testing, backend access can also be provided through port forwarding:

```bash
kubectl -n devops-part3 port-forward svc/backend 5000:5000
```

---

## 🔄 Kubernetes Declarative Deployment

The Kubernetes configuration follows the **declarative model**.

Instead of manually starting containers, the YAML files describe the desired state:

```text
YAML Desired State
        ↓
Kubernetes Controllers
        ↓
Actual State
        ↓
Drift Detection
        ↓
Self-Healing / Reconciliation
```

The project uses:

- **Deployments** to manage application Pods.
- **ReplicaSets** to maintain the requested number of Pods.
- **Services** to provide stable networking.
- **Labels and Selectors** to connect Services with Pods.
- **Namespaces** to logically isolate project resources.
- **Secrets** to provide sensitive configuration.
- **NodePort** to expose the frontend outside the cluster.
- **ClusterIP** for internal backend and MongoDB communication.

---

## 🌐 Nginx Reverse Proxy

Nginx has been successfully configured and integrated into the Docker Compose deployment. It acts as the single public entry point on port `80` and routes requests across the application services:

- Requests to `/` are proxied to the React/Vite frontend.
- Requests to `/api` are proxied to the Express backend.
- `GET /nginx-health` returns `ok` for container and load-balancer health checks.

The frontend and backend are exposed only inside the Docker network, while Nginx publishes the application through `http://localhost`.

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

## 🔄 CI/CD & Deployment Pipelines

### Jenkins Pipeline

The `Jenkinsfile` defines a Jenkins pipeline that validates the containerized application:

1. Checks out the `Main` branch from the GitHub repository.
2. Creates the backend `.env` file with the required runtime configuration.
3. Builds Docker images for the backend and frontend.
4. Starts the application with Docker Compose and verifies running containers.
5. Displays backend and frontend logs, with final logs collected even when a build fails.

The Jenkins agent must have Docker, Docker Compose, and permission to run Docker commands.

### Azure Pipelines

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

### Kubernetes Networking

The Kubernetes deployment uses Services for stable communication:

```text
Frontend
   │
   │ NodePort
   ▼
Frontend Pod

Backend Service
   │
   ├── Backend Pod 1
   └── Backend Pod 2

Backend
   │
   │ mongo:27017
   ▼
MongoDB Service
   │
   ▼
MongoDB Pod
```

The backend does not depend on a fixed MongoDB Pod IP. It communicates using the Kubernetes Service name:

```text
mongo:27017
```

---

## 🧪 Code Quality Commands

### Backend

```bash
cd backend
npm run lint
npm run lint:fix
npm run format
```

### Frontend

```bash
cd frontend
npm run lint
npm run lint:fix
npm run format
```

---

## ✅ CodeAlpha DevOps Internship — Task Coverage

This project covers **3 of the 4** internship tasks:

### Task 1: CI/CD Pipeline using Azure

Azure Pipelines builds and tests the app, pushes images to Azure Container Registry, and deploys to Azure App Service. The repository also includes a Jenkins pipeline for Docker-based build and runtime validation.

### Task 2: Web Server using Docker

Full Docker Compose setup with custom networking and persistent volumes across backend, frontend, and MongoDB services.

### Task 3: Jenkins Remoting Project

The project includes a working `Jenkinsfile` that runs on a Jenkins agent and performs Docker image builds, Docker Compose startup, container checks, and log collection. This demonstrates the practical Jenkins pipeline used for the project, alongside the Jenkins Remoting concepts: connecting remote agent nodes to a central Jenkins controller, distributing builds across machines, supporting different operating systems and architectures, and assigning jobs to labeled nodes.

### Additional DevOps Work: Kubernetes

The project also includes a local Kubernetes deployment using Minikube:

- Kubernetes Namespace
- MongoDB Deployment and ClusterIP Service
- Backend Deployment with 2 replicas
- Backend ClusterIP Service
- Frontend Deployment
- Frontend NodePort Service
- Kubernetes Secret for JWT configuration
- Declarative desired-state configuration
- Service-based internal networking
- Pod replica management
- Kubernetes troubleshooting and verification

---

## 📌 Deployment Architecture Summary

```text
                         GitHub
                            │
             ┌──────────────┴──────────────┐
             ▼                             ▼
        Jenkins Pipeline             Azure Pipelines
             │                             │
             ▼                             ▼
      Docker Build                   Docker Build
             │                             │
             ▼                             ▼
       Docker Compose                    ACR
             │                             │
             ▼                             ▼
      Local Validation             Azure App Service


                    Local Kubernetes
                         │
                      Minikube
                         │
             ┌───────────┼───────────┐
             ▼           ▼           ▼
          Frontend     Backend     MongoDB
          NodePort    ClusterIP    ClusterIP
             │           │           │
             └───────────┴───────────┘
                     Services
```

This project demonstrates practical DevOps concepts across **Git/GitHub, Docker, Docker Compose, Nginx, Jenkins, Azure Pipelines, ACR, Azure App Service, Kubernetes, Minikube, Deployments, Services, Secrets, networking, replicas, and declarative infrastructure configuration**.