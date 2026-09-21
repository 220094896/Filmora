# Filmora API Documentation

**Maintained by:** Integration & QA (Member 4)  
**Base URL (local):** `http://localhost:5000`  
**Authentication:** JWT Bearer token (`Authorization: Bearer <token>`)

---

## Health check

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/` | No |

**Success (200):**

```json
{
  "message": "Movie Rental API is running"
}
```

---

## Authentication (`/api/auth`)

### Register

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/auth/register` | No |

**Body:**

```json
{
  "name": "Nosiphiwo Mshweshwe",
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Success (201):**

```json
{
  "message": "Registration successful",
  "token": "<jwt>",
  "user": {
    "id": "...",
    "name": "Nosiphiwo Mshweshwe",
    "email": "user@example.com",
    "role": "user"
  }
}
```

**Errors:** `400` missing fields or email already exists · `500` server error

### Login

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/auth/login` | No |

**Body:**

```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Success (200):** Same shape as register (token + user).

**Errors:** `400` missing fields · `401` invalid credentials

### Current user

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/auth/me` | Yes |

**Success (200):**

```json
{
  "user": {
    "_id": "...",
    "name": "...",
    "email": "...",
    "role": "user"
  }
}
```

**Errors:** `401` no/invalid token · `404` user not found

---

## Movies (`/api/movies`)

### List movies (public)

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/movies` | No |

**Query parameters (optional):**

| Param | Description |
|-------|-------------|
| `search` | Full-text search on title, description, director |
| `genre` | Genre name (case-insensitive), e.g. `Action` |
| `page` | Page number (default `1`) |
| `limit` | Page size (default `10`) |

**Success (200):**

```json
{
  "movies": [ { "...": "movie document with populated genreId" } ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

### Get movie by ID (public)

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/movies/:id` | No |

**Success (200):** `{ "movie": { ... } }`  
**Errors:** `404` not found

### Admin: create / update / delete

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/movies` | Admin JWT |
| PUT | `/api/movies/:id` | Admin JWT |
| DELETE | `/api/movies/:id` | Admin JWT |

Soft-delete sets `isActive: false`. Seed admin (after `npm run seed` with real MongoDB):  
`admin@movierental.com` / `Admin123!`

---

## Rentals (`/api/rentals`)

### Rent a movie

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/rentals` | Yes |

**Body:**

```json
{
  "movieId": "<mongodb-object-id>"
}
```

**Success (201):**

```json
{
  "message": "Movie rented successfully",
  "rental": {
    "status": "active",
    "dueDate": "...",
    "movieId": { "title": "...", "rentalPrice": 49.99 }
  }
}
```

**Errors:** `400` missing movieId, no copies, already rented · `404` movie not found · `401` no token

### My rentals

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/rentals/my-rentals` | Yes |

**Success (200):** `{ "rentals": [ ... ] }`

### Return a movie

| Method | Endpoint | Auth |
|--------|----------|------|
| PUT | `/api/rentals/:id/return` | Yes |

**Success (200):** `{ "message": "Movie returned successfully", "rental": { "status": "returned" } }`

**Errors:** `403` not your rental · `400` already returned · `404` rental not found

---

## Client integration (Angular / React Native)

| Client | Base URL pattern |
|--------|------------------|
| Angular web | `http://localhost:5000/api/...` (see `auth.service.ts`, `rental.service.ts`) |
| React Native | Use same host (device: use machine LAN IP, e.g. `http://192.168.x.x:5000/api/...`) |

**Required header for protected routes:**

```http
Authorization: Bearer <token from login or register>
Content-Type: application/json
```

---

## Environment

| Variable | Purpose |
|----------|---------|
| `PORT` | API port (default `5000`) |
| `JWT_SECRET` | Signs JWT tokens |
| `MONGODB_URI` | Optional; empty = in-memory MongoDB for local dev |

See `backend/.env.example` and `documentation/integration-setup.md`.
