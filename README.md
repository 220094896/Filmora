# Filmora
Cross-platform movie rental system built with Angular, Express.js, and MongoDB.

## Overview
Filmora is a movie rental application with a backend API and Angular web frontend. Users can browse movies, register or log in, rent titles, and manage their rental history.

## Tech Stack
- Frontend: Angular 19
- Backend: Node.js + Express
- Database: MongoDB (with in-memory fallback for local development)

## Prerequisites
- Node.js 18+
- npm
- Optional: MongoDB installation if you want to use a real external database

## Setup
1. Open a terminal in the backend folder:
   cd backend
   npm install
2. Create or edit the file backend/.env with the following values:
   PORT=5000
   JWT_SECRET=filmora-dev-secret
   MONGODB_URI=
3. Open a terminal in the frontend folder:
   cd frontend/filmora-web
   npm install

## Run the application
Backend:
cd backend
npm start

Frontend:
cd frontend/filmora-web
npm start -- --host 0.0.0.0 --port 4200

Then open:
- Frontend: http://localhost:4200
- Backend API: http://localhost:5000

## Default behavior
The backend uses an in-memory MongoDB instance automatically when no MONGODB_URI is set. This lets the app run locally without installing MongoDB manually.

## Main API endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- GET /api/movies
- GET /api/movies/:id
- POST /api/rentals
- GET /api/rentals

## Documentation
Additional project details are in the documentation folder.
