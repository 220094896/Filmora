# Development Setup

## Prerequisites

- Node.js 20 or a compatible current LTS release
- npm
- MongoDB, local or hosted
- Chrome or Chromium for Angular headless tests
- Git, if working from a clone

## Repository layout

```text
backend/                 Express API and Mongoose models
frontend/filmora-web/    Angular web application
documentation/           Project, API, QA, and operations documentation
mobile/                  Reserved for the mobile client
```

## Backend configuration

Copy `backend/.env.example` to `backend/.env`:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/filmora
JWT_SECRET=replace-with-a-long-random-secret
PORT=5000
```

Do not commit `.env`. Use a different database for development, testing, and production.

## Install and run the backend

```powershell
cd backend
npm install
npm run seed
npm start
```

Development mode uses nodemon:

```powershell
npm run dev
```

The API is available at `http://localhost:5000`.

## Install and run the web client

```powershell
cd frontend/filmora-web
npm install
npm start
```

The Angular development server normally runs at `http://localhost:4200` and calls the API at `http://localhost:5000`.

## Seed data

`npm run seed` clears users, genres, movies, rentals, and watchlists before inserting sample data. It is destructive and must not be run against a shared or production database.

The seed currently creates these demo accounts:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@movierental.com` | `Admin123!` |
| User | `john@example.com` | `User123!` |
| User | `sarah@example.com` | `User123!` |

Change or remove these credentials before any public deployment.

## Verification commands

Backend:

```powershell
cd backend
npm test
```

Frontend:

```powershell
cd frontend/filmora-web
npm test -- --watch=false --browsers=ChromeHeadless
npm run build
```
