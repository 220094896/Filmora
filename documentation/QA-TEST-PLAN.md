# Filmora QA Test Plan

## Scope

This plan covers the Angular web client and Express/MongoDB API. It focuses on the user journeys that cross the browser, authentication middleware, API controllers, and database:

- account registration, login, and authenticated profile access;
- browsing, searching, filtering, and opening movie details;
- admin-only movie creation, update, and deletion;
- renting an available movie, viewing rental history, and returning a rental;
- cart checkout, token handling, route guards, and API error states.

## Local setup

1. Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` and `JWT_SECRET`.
2. Start MongoDB.
3. Install dependencies and seed data:

   ```powershell
   cd backend
   npm install
   npm run seed
   ```

4. Start the API in one terminal:

   ```powershell
   cd backend
   npm start
   ```

5. Start the Angular client in another terminal:

   ```powershell
   cd frontend/filmora-web
   npm install
   npm start
   ```

The client expects the API at `http://localhost:5000`.

## Automated checks

Run the backend smoke tests with:

```powershell
cd backend
npm test
```

Run the Angular unit tests and production build with:

```powershell
cd frontend/filmora-web
npm test -- --watch=false --browsers=ChromeHeadless
npm run build
```

The backend smoke tests do not require MongoDB. The authenticated and database scenarios below require the local setup.

## Integration test matrix

| ID | Scenario | Expected result |
| --- | --- | --- |
| AUTH-01 | Register with valid name, email, and password | `201`; token and public user data are returned; password is never returned |
| AUTH-02 | Register an existing email | `400`; no duplicate user is created |
| AUTH-03 | Login with invalid credentials | `401`; a generic authentication error is returned |
| AUTH-04 | Request `/api/auth/me` without a token | `401`; client remains on the protected route boundary |
| MOV-01 | Browse movies with pagination | `200`; active movies and pagination metadata are returned |
| MOV-02 | Search or filter with no matches | `200`; empty movie list and zero pagination totals are returned |
| MOV-03 | Create, update, or delete as a normal user | `403`; movie data is unchanged |
| RENT-01 | Rent an available movie while authenticated | `201`; rental is created and available copies decrease |
| RENT-02 | Rent an unavailable movie | `400`; no rental is created and inventory is unchanged |
| RENT-03 | Return a user-owned rental | `200`; rental status changes and inventory is restored |
| UI-01 | Refresh after login | Token-backed session state is preserved and API calls include `Authorization` |
| UI-02 | Open `/rentals` while logged out | Auth guard redirects to login |
| UI-03 | Open `/admin` as a normal user | Admin guard denies access |

## Evidence and exit criteria

For each manual scenario, record the test ID, date, browser, account role, setup data, result, and a screenshot or API response when it fails. A release candidate is acceptable when all automated checks pass, all critical authentication and rental scenarios pass, no blocker or critical defects remain open, and known environment limitations are recorded.

## Known test limitations

- The current repository does not include a CI workflow or a disposable MongoDB test database.
- Database-backed integration tests should run against an isolated database, never a developer's shared or production database.
- Browser tests require Chrome/Chromium available to Karma; use the backend smoke tests and Angular build as the minimum offline checks.