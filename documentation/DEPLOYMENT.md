# Deployment Guide

## Production prerequisites

- Managed MongoDB database with backups enabled
- Node.js LTS runtime
- Static hosting or a web server for the Angular build
- TLS certificate and HTTPS for both client and API
- Secret storage for `MONGODB_URI` and `JWT_SECRET`
- A monitoring and log collection destination

## Backend deployment

1. Build or copy the backend source to the API host.
2. Run `npm ci --omit=dev` in `backend`.
3. Set production environment variables:

   ```dotenv
   NODE_ENV=production
   MONGODB_URI=<managed-mongodb-uri>
   JWT_SECRET=<long-random-secret>
   PORT=5000
   ```

4. Start with `npm start` under a process manager.
5. Put the API behind HTTPS and a reverse proxy.
6. Restrict CORS to the deployed web origin instead of allowing every origin.
7. Confirm `GET /` and an authenticated test request from the deployed client.

Never run `npm run seed` in production. The seed command deletes existing data.

## Frontend deployment

1. Set the API URL for the deployment environment. The current services use `http://localhost:5000` directly, so production requires replacing that configuration with the deployed API origin before building.
2. Run:

   ```powershell
   cd frontend/filmora-web
   npm ci
   npm run build
   ```

3. Publish `dist/filmora-web` through a static host.
4. Configure the host to serve `index.html` for Angular client-side routes.
5. Verify login, catalogue browsing, protected rentals, and administrator navigation against the production API.

## Release checklist

- [ ] Production secrets are set outside source control.
- [ ] JWT secret is unique and sufficiently random.
- [ ] CORS is restricted to approved origins.
- [ ] Seed credentials are disabled or changed.
- [ ] Database backups and access controls are verified.
- [ ] Frontend API URL is not localhost.
- [ ] Auth storage key and interceptor behavior are aligned.
- [ ] Backend smoke tests pass.
- [ ] Angular build passes.
- [ ] Critical QA scenarios pass in an isolated environment.
- [ ] Logs do not expose passwords or JWTs.
