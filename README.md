# Darjeeling WebApp

A full-stack monorepo built with NestJS (Backend) and React/Vite (Frontends). The project uses a single PostgreSQL database managed by Drizzle ORM.

## Prerequisites

Before starting, ensure you have the following installed and running on your machine:
- **Node.js** (v18+ recommended)
- **[pnpm](https://pnpm.io/)** (used for workspace and package management)
- **Docker Desktop** (or Docker Engine, for running the local PostgreSQL database)

## Quick Start Guide

Follow these steps to get the full stack (backend and all frontends) running locally:

### 1. Start the Database
The backend requires a PostgreSQL database to run locally. Ensure your Docker Desktop is running, then start the container:

```bash
cd backend
docker-compose up -d
```
> **Note:** This runs a `postgres:15-alpine` instance named `darjeeling-postgres` in the background on port `5432`.

### 2. Install Dependencies
Go back to the root directory of the project and install all workspace dependencies using `pnpm`:

```bash
cd ..
pnpm install
```

### 3. Run the Development Servers
Start both the backend and all the frontend applications simultaneously using the root workspace script:

```bash
pnpm run dev
```

This command uses `concurrently` under the hood to start:
- The **Backend** (NestJS) server 
- The **Frontend Web** (Consumer App)
- The **Frontend ERP** (Homestay Partners App)
- The **Frontend Driver** (Driver Partners App)

### 4. Database Migrations (Optional / When Schema Changes)
If you update the schema (`backend/src/db/schema.ts`), you can push changes to your local database using Drizzle Kit:

```bash
cd backend
npx drizzle-kit push
```

## Structure
- `/backend`: NestJS application containing business logic and database configuration.
- `/frontend-web`: Consumer facing website.
- `/frontend-erp`: Dashboard for Homestay Partners.
- `/frontend-driver`: Application for Logistics/Driver Partners.
- `/shared`: Shared libraries, types, or configurations across the workspace.
