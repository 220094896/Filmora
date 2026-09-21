# Project Overview

## Purpose

Filmora provides a browser-based movie rental workflow. Visitors can browse the active catalogue, search and filter titles, inspect movie details, and register or sign in. Authenticated users can rent available titles, view their rentals, and return them. Administrators can manage catalogue records.

## Technology stack

| Layer | Technology |
| --- | --- |
| Web client | Angular 19, TypeScript, RxJS, Bootstrap |
| API | Node.js, Express 5 |
| Database | MongoDB through Mongoose 8 |
| Authentication | JWT and bcryptjs |
| Testing | Node built-in test runner, Jasmine/Karma for Angular |

## Roles

### Visitor

- View active movies.
- Search by movie text.
- Filter by genre name.
- Open movie details.
- Register or log in.

### User

- Access the authenticated profile endpoint.
- Rent an available movie.
- View personal rentals.
- Return personal active rentals.

### Administrator

- Perform all user actions.
- Create movies.
- Update movies.
- Soft-delete movies by setting `isActive` to false.

## Current product boundaries

The current server does not expose genre CRUD endpoints or watchlist endpoints. The watchlist collection and seed cleanup are present in the data layer, but the feature is not available through the API. Mobile application files are not currently implemented in the repository.

## Business rules

- New registrations receive the `user` role.
- Rental periods are seven days from creation.
- A movie cannot be rented when inactive or when `availableCopies` is zero.
- A user cannot hold two active rentals for the same movie.
- Returning a rental restores one available copy.
- Movie deletion is a soft delete, so the record remains in MongoDB.
