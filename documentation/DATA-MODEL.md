# Data Model

## User

Collection: `users`

| Field | Type | Rules |
| --- | --- | --- |
| `name` | String | Required, trimmed |
| `email` | String | Required, unique, lowercase, trimmed |
| `password` | String | Required; stored as a bcrypt hash after registration |
| `role` | String | `user` or `admin`; defaults to `user` |
| `createdAt`, `updatedAt` | Date | Mongoose timestamps |

Passwords are excluded from the `/api/auth/me` response and are never returned in registration or login response user objects.

## Genre

Collection: `genres`

| Field | Type | Rules |
| --- | --- | --- |
| `name` | String | Required |
| `description` | String | Optional |

Movies reference genres through `genreId`.

## Movie

Collection: `movies`

| Field | Type | Rules |
| --- | --- | --- |
| `title` | String | Required, trimmed |
| `description` | String | Required |
| `genreId` | ObjectId | Required, references `Genre` |
| `releaseYear` | Number | Required |
| `director` | String | Required |
| `cast` | String[] | Defaults to empty array |
| `duration` | Number | Required, minutes |
| `rating` | Number | Defaults to `0` |
| `rentalPrice` | Number | Required |
| `image` | String | Optional URL |
| `totalCopies` | Number | Required, defaults to `1` |
| `availableCopies` | Number | Required, defaults to `1` |
| `isActive` | Boolean | Defaults to `true` |

Movie search uses a text index over `title`, `description`, and `director`.

## Rental

Collection: `rentals`

| Field | Type | Rules |
| --- | --- | --- |
| `userId` | ObjectId | Required, references `User` |
| `movieId` | ObjectId | Required, references `Movie` |
| `rentalDate` | Date | Defaults to current time |
| `dueDate` | Date | Required; normally seven days after rental |
| `returnDate` | Date | Null until returned |
| `status` | String | `active`, `returned`, or `overdue` |
| `createdAt`, `updatedAt` | Date | Mongoose timestamps |

## Watchlist

Collection: `watchlists`

The model stores `userId`, `movieId`, and `addedAt`, with a unique compound index on `{ userId, movieId }`. No watchlist HTTP routes are currently mounted.

## Relationships

```text
User 1 ---- * Rental * ---- 1 Movie * ---- 1 Genre
User 1 ---- * Watchlist * ---- 1 Movie
```

## Inventory behavior

- Creating a rental decrements `Movie.availableCopies`.
- Returning a rental increments `Movie.availableCopies`.
- Updating `totalCopies` preserves the number of currently rented copies.
- Deleting a movie sets `isActive` to false rather than removing the document.
