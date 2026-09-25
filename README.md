# 📋 MERN Task Manager — DevOps Enabled

A full-stack Task Management web application built with the **MERN stack (MongoDB, Express.js, React, Node.js)** and extended with practical DevOps technologies including **Docker, Docker Compose, Nginx, Jenkins, Azure Pipelines, Azure Container Registry, Azure App Service, Kubernetes, and Minikube**.

The project demonstrates containerization, CI/CD, service-based networking, Kubernetes deployments, configuration management, secrets, replicas, and declarative infrastructure.

---

## ✨ Features

* 🔐 **Authentication & Authorization**

  * User registration and login
  * JWT-based authentication
  * Password hashing with `bcryptjs`

* 📝 **Task Management**

  * Create tasks
  * View tasks
  * Update tasks
  * Delete tasks
  * User-specific tasks
  * Task priorities and statuses

* 🎨 **Modern Frontend**

  * React 19
  * Vite
  * Tailwind CSS v4
  * React Router v7
  * Axios

* 🐳 **Docker & Docker Compose**

  * Containerized frontend, backend, and MongoDB
  * Custom Docker network
  * Persistent MongoDB volume
  * Multi-container application orchestration

* 🌐 **Nginx Reverse Proxy**

  * Single public entry point
  * Frontend routing through `/`
  * Backend API routing through `/api`
  * Nginx health endpoint

* ☸️ **Kubernetes with Minikube**

  * Namespace isolation
  * MongoDB Deployment and Service
  * Backend Deployment with 2 replicas
  * Frontend Deployment and NodePort Service
  * ClusterIP Services for internal communication
  * ConfigMap
  * Kubernetes Secret
  * Labels and selectors
  * Declarative configuration
  * Rolling updates
  * Service-based networking

* 🔄 **CI/CD**

  * Jenkins pipeline for Docker-based validation
  * Azure Pipelines for CI/CD
  * Docker image builds
  * Azure Container Registry integration
  * Azure App Service deployment

---

# 🛠️ Tech Stack

| Category           | Technology                                              |
| ------------------ | ------------------------------------------------------- |
| Frontend           | React 19, Vite, Tailwind CSS v4, Axios, React Router v7 |
| Backend            | Node.js, Express.js v5, Mongoose v9                     |
| Database           | MongoDB 6.0                                             |
| Authentication     | JWT, bcryptjs                                           |
| Containerization   | Docker, Docker Compose                                  |
| Reverse Proxy      | Nginx                                                   |
| CI/CD              | Jenkins, Azure Pipelines                                |
| Container Registry | Azure Container Registry (ACR)                          |
| Cloud Deployment   | Azure App Service                                       |
| Orchestration      | Kubernetes, Minikube                                    |
| Code Quality       | ESLint, Prettier                                        |
| Version Control    | Git, GitHub                                             |

---

# 📁 Project Structure

```text
task manager/
│
├── azure-pipelines.yml
├── Jenkinsfile
├── docker-compose.yml
│
├── k8s/
│   ├── 00-namespace.yaml
│   ├── 01-mongo.yaml
│   ├── 02-backend.yaml
│   ├── 02-backend-configure.yaml
│   ├── 03-frontend.yaml
│   ├── configmap.yaml
│   └── secret_mongo.yaml
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── dockerfile
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── dockerfile
│   ├── package.json
│   └── vite.config.js
│
├── nginx/
│   └── nginx.conf
│
└── README.md
```

> `02-backend-configure.yaml` is the Kubernetes backend configuration used with the ConfigMap and Secret.

---

# ⚙️ Environment Variables

## Backend `.env`

For local development, the backend uses:

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/taskmanager
JWT_SECRET=your_jwt_secret_key_here
```

### Local MongoDB

If MongoDB is running directly on the host:

```env
MONGO_URI=mongodb://localhost:27017/taskmanager
```

---

# ☸️ Kubernetes Configuration

The Kubernetes deployment uses the MongoDB Kubernetes Service for internal database communication.

The backend connects to MongoDB using:

```text
mongodb://mongo:27017/taskmanager
```

The hostname `mongo` is the Kubernetes Service name.

The backend does **not** use a fixed MongoDB Pod IP.

---

# 🔐 Kubernetes ConfigMap and Secret

Kubernetes separates normal configuration from sensitive configuration.

## ConfigMap

The project uses:

```text
app-config
```

Example:

```yaml
apiVersion: v1
kind: ConfigMap

metadata:
  name: app-config

data:
  MONGO_HOST: mongo
  FRONTEND_URL: http://localhost:5173
```

Create it with:

```bash
kubectl -n devops-part3 apply -f k8s/configmap.yaml
```

Check it:

```bash
kubectl -n devops-part3 get configmap app-config
```

---

## Secret

Sensitive backend values are stored in:

```text
mongo-secret
```

The Secret contains:

```text
MONGO_URI
JWT_SECRET
```

Example:

```yaml
apiVersion: v1
kind: Secret

metadata:
  name: mongo-secret

type: Opaque

stringData:
  MONGO_URI: mongodb://mongo:27017/taskmanager
  JWT_SECRET: mysecretkey123
```

Create/update it with:

```bash
kubectl -n devops-part3 apply -f k8s/secret_mongo.yaml
```

Check it:

```bash
kubectl -n devops-part3 get secret mongo-secret
```

> Never commit real production secrets to GitHub. Use a secure secret-management solution for production environments.

---

# 🏗️ Kubernetes Architecture

```text
                         Browser
                            │
                            │ NodePort
                            ▼
                 ┌──────────────────────┐
                 │  Frontend Service    │
                 │      NodePort        │
                 │      :5173           │
                 └──────────┬───────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Frontend Pod  │
                    │ React + Vite  │
                    └───────┬───────┘
                            │
                            │ API Requests
                            ▼
                 ┌──────────────────────┐
                 │  Backend Service     │
                 │      ClusterIP       │
                 │        :5000         │
                 └──────────┬───────────┘
                            │
                     ┌──────┴──────┐
                     ▼             ▼
              ┌────────────┐ ┌────────────┐
              │ Backend    │ │ Backend    │
              │ Pod 1      │ │ Pod 2      │
              │ :5000      │ │ :5000      │
              └──────┬─────┘ └──────┬─────┘
                     │               │
                     └───────┬───────┘
                             │
                             │ mongo:27017
                             ▼
                 ┌──────────────────────┐
                 │   MongoDB Service    │
                 │      ClusterIP       │
                 │       :27017         │
                 └──────────┬───────────┘
                            │
                            ▼
                     ┌─────────────┐
                     │ MongoDB Pod │
                     └─────────────┘
```

---

# 📦 Kubernetes Resources

All application resources are deployed inside:

```text
devops-part3
```

| Resource       | Type              | Purpose                              |
| -------------- | ----------------- | ------------------------------------ |
| `devops-part3` | Namespace         | Isolates project resources           |
| `mongo`        | Deployment        | Runs MongoDB                         |
| `mongo`        | ClusterIP Service | Internal MongoDB networking          |
| `backend`      | Deployment        | Runs backend replicas                |
| `backend`      | ClusterIP Service | Internal backend networking          |
| `frontend`     | Deployment        | Runs React frontend                  |
| `frontend`     | NodePort Service  | Exposes frontend outside the cluster |
| `app-config`   | ConfigMap         | Stores non-sensitive configuration   |
| `mongo-secret` | Secret            | Stores MongoDB URI and JWT secret    |

---

# 🚀 Kubernetes Deployment with Minikube

## Prerequisites

* Docker Desktop
* Kubernetes
* Minikube
* kubectl
* Node.js 20+

Start Minikube:

```bash
minikube start --driver=docker
```

Check the cluster:

```bash
minikube status
```

---

## 1. Create Namespace

```bash
kubectl apply -f k8s/00-namespace.yaml
```

---

## 2. Deploy MongoDB

```bash
kubectl -n devops-part3 apply -f k8s/01-mongo.yaml
```

Check MongoDB:

```bash
kubectl -n devops-part3 get pods -l app=mongo
```

Check Service:

```bash
kubectl -n devops-part3 get svc mongo
```

Check endpoints:

```bash
kubectl -n devops-part3 get endpoints mongo
```

MongoDB is internally available through:

```text
mongo:27017
```

---

## 3. Create ConfigMap

```bash
kubectl -n devops-part3 apply -f k8s/configmap.yaml
```

Verify:

```bash
kubectl -n devops-part3 get configmap app-config
```

---

## 4. Create Kubernetes Secret

```bash
kubectl -n devops-part3 apply -f k8s/secret_mongo.yaml
```

Verify:

```bash
kubectl -n devops-part3 get secret mongo-secret
```

---

## 5. Deploy Backend

The configured backend Deployment uses:

* `app-config` ConfigMap
* `mongo-secret` Secret
* 2 backend replicas
* Backend ClusterIP Service

Apply:

```bash
kubectl -n devops-part3 apply -f k8s/02-backend-configure.yaml
```

Check Deployment:

```bash
kubectl -n devops-part3 get deployment backend
```

Check Pods:

```bash
kubectl -n devops-part3 get pods -l app=backend
```

Check Service:

```bash
kubectl -n devops-part3 get svc backend
```

Check endpoints:

```bash
kubectl -n devops-part3 get endpoints backend
```

Expected architecture:

```text
backend Service
      │
      ├── Backend Pod 1
      │
      └── Backend Pod 2
```

---

# 🔑 Verify Backend Environment

Check MongoDB configuration:

```bash
kubectl -n devops-part3 exec <backend-pod-name> -- printenv | grep MONGO
```

On Windows PowerShell:

```powershell
kubectl -n devops-part3 exec <backend-pod-name> -- printenv | findstr MONGO
```

Check JWT configuration:

```powershell
kubectl -n devops-part3 exec <backend-pod-name> -- printenv | findstr JWT
```

The backend receives configuration from Kubernetes rather than hardcoding sensitive values inside the Deployment.

> Avoid printing real secrets in shared terminals, logs, screenshots, or documentation.

---

# 🔄 Updating Kubernetes Secrets

Environment variables injected from Secrets are loaded when a Pod starts.

If a Secret is changed, restart the Deployment:

```bash
kubectl -n devops-part3 rollout restart deployment/backend
```

Check rollout:

```bash
kubectl -n devops-part3 rollout status deployment/backend
```

Verify Pods:

```bash
kubectl -n devops-part3 get pods -l app=backend
```

---

# 6. Deploy Frontend

```bash
kubectl -n devops-part3 apply -f k8s/03-frontend.yaml
```

Check frontend Pods:

```bash
kubectl -n devops-part3 get pods -l app=frontend
```

Check frontend Service:

```bash
kubectl -n devops-part3 get svc frontend
```

Check endpoints:

```bash
kubectl -n devops-part3 get endpoints frontend
```

---

# 🌐 Access the Frontend

The frontend uses a Kubernetes `NodePort` Service.

Open it through Minikube:

```bash
minikube service frontend -n devops-part3
```

The NodePort may vary depending on the Kubernetes configuration.

---

# 🔌 Backend Port Forwarding

For local backend testing:

```bash
kubectl -n devops-part3 port-forward svc/backend 5000:5000
```

The backend can then be accessed through:

```text
http://localhost:5000
```

If the application exposes a health endpoint:

```text
http://localhost:5000/health
```

---

# 🔍 Kubernetes Verification Commands

Check all resources:

```bash
kubectl -n devops-part3 get all
```

Check Pods:

```bash
kubectl -n devops-part3 get pods
```

Check Services:

```bash
kubectl -n devops-part3 get svc
```

Check Deployments:

```bash
kubectl -n devops-part3 get deployments
```

Check backend logs:

```bash
kubectl -n devops-part3 logs -l app=backend --tail=100
```

---

# 🧠 Kubernetes Concepts Demonstrated

## Declarative Configuration

The project uses Kubernetes YAML files to describe the desired state.

```text
YAML
  │
  ▼
Desired State
  │
  ▼
Kubernetes Controllers
  │
  ▼
Actual State
  │
  ▼
Reconciliation
```

Instead of manually managing individual containers, Kubernetes maintains the desired state described in the YAML files.

---

## Deployments

Deployments manage application Pods.

The backend uses:

```yaml
replicas: 2
```

Therefore Kubernetes maintains two backend replicas.

---

## ReplicaSets

Deployments create and manage ReplicaSets.

```text
Deployment
     │
     ▼
ReplicaSet
     │
 ┌───┴───┐
 ▼       ▼
Pod     Pod
```

ReplicaSets help maintain the requested number of Pods.

---

## Services

Services provide stable networking for Pods.

### ClusterIP

Used for internal communication:

```text
backend:5000
mongo:27017
```

### NodePort

Used to expose the frontend outside the cluster:

```text
Browser
   │
   ▼
NodePort
   │
   ▼
Frontend Service
   │
   ▼
Frontend Pod
```

---

## Labels and Selectors

Pods use labels such as:

```yaml
labels:
  app: backend
```

Services use selectors:

```yaml
selector:
  app: backend
```

This allows the Service to discover the correct backend Pods.

---

## ConfigMap

Used for non-sensitive configuration:

```text
app-config
```

---

## Secret

Used for sensitive configuration:

```text
mongo-secret
```

---

## Rolling Updates

When the Backend Deployment configuration changes, Kubernetes creates new Pods and gradually removes the old Pods.

```text
Old Pods
   │
   ▼
New Pods Created
   │
   ▼
New Pods Become Ready
   │
   ▼
Old Pods Terminated
```

This was tested during the project's ConfigMap and Secret configuration.

---

# 🌐 Nginx Reverse Proxy

Nginx is used in the Docker Compose deployment as the public entry point.

```text
                    Browser
                       │
                       ▼
                  Nginx :80
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
          Frontend           Backend
             /                /api
```

### Routes

Frontend:

```text
/
```

Backend:

```text
/api
```

Health check:

```text
/nginx-health
```

The Docker Compose application can therefore be accessed through:

```text
http://localhost
```

---

# 🐳 Docker Compose

Start the complete application:

```bash
docker compose up --build -d
```

Check running containers:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs
```

Stop the application:

```bash
docker compose down
```

MongoDB data is stored using a Docker named volume so that data can survive container restarts.

---

# 🔄 CI/CD

## Jenkins Pipeline

The Jenkins pipeline performs Docker-based application validation.

The pipeline:

1. Checks out the GitHub repository.
2. Creates the backend environment configuration.
3. Builds backend and frontend Docker images.
4. Starts Docker Compose services.
5. Checks running containers.
6. Collects application logs.
7. Performs validation and troubleshooting output.

---

## Azure Pipelines

The Azure Pipeline provides CI/CD automation.

### Continuous Integration

The pipeline:

* Triggers for configured branches.
* Installs backend dependencies.
* Installs frontend dependencies.
* Runs ESLint.
* Builds Docker images.

### Container Registry

Successful builds can push Docker images to:

```text
Azure Container Registry (ACR)
```

### Azure Deployment

The pipeline can deploy containerized application images to:

```text
Azure App Service
```

The deployment uses configured Azure service connection credentials rather than requiring manual SSH deployment.

---

# ☁️ Deployment Architecture

```text
                         GitHub
                            │
                 ┌──────────┴──────────┐
                 │                     │
                 ▼                     ▼
             Jenkins            Azure Pipelines
                 │                     │
                 ▼                     ▼
           Docker Build          Docker Build
                 │                     │
                 ▼                     ▼
          Docker Compose              ACR
          Local Validation             │
                                       ▼
                                Azure App Service


                    Local Kubernetes
                           │
                        Minikube
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
         Frontend       Backend       MongoDB
         NodePort       ClusterIP     ClusterIP
             │             │             │
             └─────────────┴─────────────┘
                         Services
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint             | Description                         | Authentication |
| ------ | -------------------- | ----------------------------------- | -------------- |
| POST   | `/api/auth/register` | Register a new user                 | No             |
| POST   | `/api/auth/login`    | Authenticate user and receive token | No             |

## Tasks

| Method | Endpoint         | Description                    | Authentication |
| ------ | ---------------- | ------------------------------ | -------------- |
| GET    | `/api/tasks`     | Get authenticated user's tasks | Yes            |
| POST   | `/api/tasks`     | Create a task                  | Yes            |
| PUT    | `/api/tasks/:id` | Update a task                  | Yes            |
| DELETE | `/api/tasks/:id` | Delete a task                  | Yes            |

---

# 🧪 Code Quality

## Backend

```bash
cd backend

npm run lint
npm run lint:fix
npm run format
```

## Frontend

```bash
cd frontend

npm run lint
npm run lint:fix
npm run format
```

---

# 📚 DevOps Concepts Covered

This project demonstrates practical experience with:

```text
Git & GitHub
     ↓
Docker
     ↓
Docker Compose
     ↓
Nginx
     ↓
Jenkins
     ↓
Azure Pipelines
     ↓
Azure Container Registry
     ↓
Azure App Service
     ↓
Kubernetes
     ↓
Minikube
     ↓
Deployments
     ↓
ReplicaSets
     ↓
Pods
     ↓
Services
     ↓
Labels & Selectors
     ↓
ConfigMaps
     ↓
Secrets
     ↓
Rolling Updates
     ↓
Kubernetes Networking
```

---

# 🎯 CodeAlpha DevOps Internship — Task Coverage

## Task 1 — CI/CD Pipeline using Azure

Implemented Azure Pipelines for:

* Dependency installation
* Code quality checks
* Docker image builds
* Container image publishing to ACR
* Azure App Service deployment

---

## Task 2 — Web Server using Docker

Implemented:

* Dockerized frontend
* Dockerized backend
* MongoDB container
* Docker Compose
* Custom Docker networking
* Persistent MongoDB volume
* Nginx reverse proxy

---

## Task 3 — Jenkins Remoting Project

Implemented a Jenkins pipeline capable of:

* Checking out source code
* Building Docker images
* Starting Docker Compose
* Validating containers
* Collecting application logs

The project also demonstrates the practical use of Jenkins agents for distributed build execution.

---

## Additional DevOps Work — Kubernetes

The project includes a local Kubernetes deployment using Minikube with:

* Kubernetes Namespace
* MongoDB Deployment
* MongoDB ClusterIP Service
* Backend Deployment
* 2 Backend replicas
* Backend ClusterIP Service
* Frontend Deployment
* Frontend NodePort Service
* ConfigMap
* Kubernetes Secret
* Labels and selectors
* Declarative configuration
* Service-based networking
* Rolling updates
* Kubernetes troubleshooting and verification

---

# 🚀 Current Kubernetes Status

The current Kubernetes implementation has the following architecture:

```text
Namespace: devops-part3

├── MongoDB
│   ├── Deployment
│   └── ClusterIP Service
│
├── Backend
│   ├── Deployment
│   ├── 2 Replicas
│   └── ClusterIP Service
│
├── Frontend
│   ├── Deployment
│   └── NodePort Service
│
├── ConfigMap
│   └── app-config
│
└── Secret
    └── mongo-secret
        ├── MONGO_URI
        └── JWT_SECRET
```

---

# 📌 Project Summary

This project combines a full-stack MERN application with practical DevOps workflows.

It demonstrates the complete journey from application development to containerization, reverse proxy configuration, CI/CD automation, cloud deployment, and Kubernetes orchestration.

The project covers:

**Git/GitHub → Docker → Docker Compose → Nginx → Jenkins → Azure Pipelines → ACR → Azure App Service → Kubernetes → Minikube → Deployments → Services → ConfigMaps → Secrets → Replicas → Networking → Rolling Updates**
