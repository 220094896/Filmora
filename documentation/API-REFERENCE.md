# API Reference

Base URL: `http://localhost:5000`

All request and response bodies are JSON. Authentication uses:

```http
Authorization: Bearer <jwt>
```

## Status conventions

| Status | Meaning in this API |
| --- | --- |
| `200` | Successful read, update, return, or login |
| `201` | User or rental/movie created |
| `400` | Invalid input or business rule violation |
| `401` | Missing or invalid authentication |
| `403` | Authenticated user lacks administrator or ownership permission |
| `404` | Requested record does not exist |
| `500` | Unexpected server or database failure |

## Health endpoint

### `GET /`

No authentication.

Response:

```json
{ "message": "Movie Rental API is running" }
```

## Authentication

### `POST /api/auth/register`

Request:

```json
{
  "name": "Alex User",
  "email": "alex@example.com",
  "password": "Password123!"
}
```

Success: `201`

```json
{
  "message": "Registration successful",
  "token": "<jwt>",
  "user": { "id": "<id>", "name": "Alex User", "email": "alex@example.com", "role": "user" }
}
```

### `POST /api/auth/login`

Request:

```json
{ "email": "alex@example.com", "password": "Password123!" }
```

Success: `200`, with the same `token` and `user` structure as registration. Missing fields return `400`; invalid credentials return `401`.

### `GET /api/auth/me`

Requires authentication. Returns `200` with:

```json
{ "user": { "_id": "<id>", "name": "Alex User", "email": "alex@example.com", "role": "user" } }
```

The password is excluded.

## Movies

### `GET /api/movies`

Public. Optional query parameters:

| Parameter | Default | Description |
| --- | --- | --- |
| `search` | none | Text search over title, description, and director |
| `genre` | none | Case-insensitive exact genre name |
| `page` | `1` | One-based page number |
| `limit` | `10` | Number of records per page |

Response:

```json
{
  "movies": [],
  "pagination": { "page": 1, "limit": 10, "total": 0, "pages": 0 }
}
```

Only active movies are returned.

### `GET /api/movies/:id`

Public. Returns `200` with `{ "movie": { ... } }`, or `404` when the movie is missing.

### `POST /api/movies`

Requires an administrator token. Required fields are `title`, `description`, `genreId`, `releaseYear`, `director`, `duration`, `rentalPrice`, and `totalCopies`. Optional fields include `cast`, `rating`, and `image`.

Creating a movie sets `availableCopies` to `totalCopies`. Success: `201` with `message` and populated `movie`.

### `PUT /api/movies/:id`

Requires an administrator token. Accepts any supported movie fields as a partial update. When `totalCopies` changes, currently rented copies are preserved. Success: `200` with `message` and updated `movie`.

### `DELETE /api/movies/:id`

Requires an administrator token. Performs a soft delete by setting `isActive` to false. Success: `200`:

```json
{ "message": "Movie removed successfully" }
```

## Rentals

All rental endpoints require authentication.

### `POST /api/rentals`

Request:

```json
{ "movieId": "<movie-id>" }
```

A rental lasts seven days. The endpoint rejects inactive movies, unavailable inventory, and duplicate active rentals for the same user/movie pair. Success: `201` with `message` and populated `rental`.

### `GET /api/rentals/my-rentals`

Returns the signed-in user's rentals, newest first:

```json
{ "rentals": [] }
```

### `PUT /api/rentals/:id/return`

Returns a rental owned by the signed-in user. Success: `200` with `message` and `rental`. Returning an already returned rental returns `400`; another user's rental returns `403`.

## Not currently exposed

There are no mounted HTTP endpoints for genres or watchlists. Do not build client integrations against those models until routes and controllers are added.
