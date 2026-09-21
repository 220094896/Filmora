# Filmora API Documentation

## Base URL
- Local backend: http://localhost:5000

## Authentication

### Register a user
- Method: POST
- Endpoint: /api/auth/register
- Body:
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }

### Login a user
- Method: POST
- Endpoint: /api/auth/login
- Body:
  {
    "email": "john@example.com",
    "password": "password123"
  }

### Get current user
- Method: GET
- Endpoint: /api/auth/me
- Requires: JWT token in Authorization header

## Movies

### Get all movies
- Method: GET
- Endpoint: /api/movies

### Get movie by ID
- Method: GET
- Endpoint: /api/movies/:id

## Rentals

### Create rental
- Method: POST
- Endpoint: /api/rentals
- Requires: valid user token

### Get rentals
- Method: GET
- Endpoint: /api/rentals
- Requires: valid user token

## Notes
- The backend uses JWT for authentication.
- If no MongoDB URI is configured, the app automatically starts an in-memory MongoDB instance for local development.
- Frontend runs on http://localhost:4200
