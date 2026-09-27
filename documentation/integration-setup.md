# Filmora — Integration & QA Setup Guide

This guide is for running the **full stack** and **automated integration tests** (Member 4 deliverable).

---

## Prerequisites

- Node.js 18+
- npm
- Optional: MongoDB (if not using in-memory DB)
- Optional: [Postman](https://www.postman.com/) for manual API runs

---

## 1. Backend

```powershell
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
JWT_SECRET=filmora-dev-secret
MONGODB_URI=
```

Leave `MONGODB_URI` empty to use the built-in in-memory MongoDB.

Start the API:

```powershell
npm start
```

Verify: open `http://localhost:5000` — should return JSON with `"Movie Rental API is running"`.

---

## 2. Angular web (integration testing)

```powershell
cd frontend/filmora-web
npm install
npm start -- --host 0.0.0.0 --port 4200
```

Open `http://localhost:4200` and run manual cases from `documentation/test-plan.md` (WEB-01–WEB-08).

The web app calls the API at `http://localhost:5000/api/...`.

---

## 3. Automated API integration tests

From the `backend` folder:

```powershell
npm test
```

Or only the integration file:

```powershell
npm run test:integration
```

Tests use an isolated in-memory database (see `backend/tests/`). They do **not** require the server to be running on port 5000.

---

## 4. Postman

1. Import `documentation/postman/Filmora-API.postman_collection.json`
2. Import `documentation/postman/Filmora-Local.postman_environment.json`
3. Select environment **Filmora Local**
4. Run **Register** or **Login** — the collection saves `authToken` automatically
5. Run **Movies** and **Rentals** folders in order

---

## 5. React Native (Member 2)

When the mobile app is available on branch `mobile-react-native`:

- Point the app API base URL to your machine IP (not `localhost` on a physical device)
- Re-use the same Postman auth and rental flows (MOB-01–MOB-03 in test plan)

---

## 6. Troubleshooting

| Issue | Fix |
|-------|-----|
| 403 on GitHub push | Sign in as repo owner; see team Git setup |
| CORS errors | Ensure backend is running with `cors()` enabled (default) |
| 401 on rentals | Run Login in Postman or log in on web; check Bearer header |
| Empty movies | Seed DB with MongoDB URI set, or create movies via admin API |
| Tests fail on first run | Run `npm install` in `backend`; Node 18+ required |

---

## 7. Member 4 submission files

| File | Description |
|------|-------------|
| `documentation/api-documentation.md` | API reference |
| `documentation/test-plan.md` | Manual + API test cases |
| `documentation/integration-test-report.md` | Test execution record |
| `documentation/member4-integration-qa-submission.md` | Role summary for lecturers |
| `documentation/postman/*.json` | Postman collection + environment |
| `backend/tests/api.integration.test.js` | Automated integration tests |
