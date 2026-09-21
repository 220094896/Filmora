# Troubleshooting

## `Cannot find module` when running npm commands

Run `npm install` in the project that owns the command. Backend and frontend have separate `package.json` files:

```powershell
cd backend
npm install

cd ../frontend/filmora-web
npm install
```

## MongoDB connection failed

Check that MongoDB is running, `MONGODB_URI` exists in `backend/.env`, and the database host is reachable. The API exits when its initial database connection fails.

## Port 5000 is already in use

Set another `PORT` in `backend/.env`, then update the frontend service URLs to match. Restart both processes.

## Browser shows network errors or CORS errors

Confirm the API is running at the URL used by the Angular services. Confirm the API responds to `GET /`. For deployed environments, configure CORS for the actual web origin rather than relying on local defaults.

## Login succeeds but rentals return 401

Check the browser's outgoing request headers. The current client has a storage-key mismatch: `AuthService` writes `token`, while the interceptor reads `filmora_token`. Align those keys and retest a protected request.

## `npm run seed` removed my local data

This is expected. The seed script clears users, genres, movies, rentals, and watchlists before inserting demo data. Restore from backup if the database was not disposable.

## Angular headless tests do not start

Install or expose Chrome/Chromium and run:

```powershell
npm test -- --watch=false --browsers=ChromeHeadless
```

If the command hangs or exits without a result, run the Angular build separately to distinguish browser-launcher problems from TypeScript compilation problems.

## API returns 403 for movie mutations

Movie create, update, and delete require a valid JWT for a user whose role is `admin`. A regular user receives `403 Admin access required`.

## A movie cannot be rented

Check that the movie is active, `availableCopies` is greater than zero, and the user does not already have an active rental for that movie.
