# Filmora — Test Plan (Integration & QA)

**Author:** Nosiphiwo Mshweshwe (Member 4 — Integration & QA)  
**Project:** Filmora cross-platform movie rental system  
**Version:** 1.0  
**Date:** September 2026

---

## 1. Purpose

Verify that the Express API, Angular web app, and (when delivered) React Native mobile app work together correctly: authentication, movie browsing, rentals, and returns.

---

## 2. Scope

| In scope | Out of scope |
|----------|----------------|
| REST API contract and HTTP status codes | Unit tests inside Angular components (Member 1) |
| End-to-end user flows on web | Backend business logic unit tests (Member 3) |
| Postman / automated API integration tests | App Store / Play Store release |
| Regression before demos and merges to `main` | Load / stress testing |

---

## 3. Test environment

| Component | URL / command |
|-----------|----------------|
| Backend | `http://localhost:5000` — `cd backend && npm start` |
| Angular web | `http://localhost:4200` — `cd frontend/filmora-web && npm start` |
| Automated API tests | `cd backend && npm test` |
| Postman collection | `documentation/postman/Filmora-API.postman_collection.json` |

See `documentation/integration-setup.md` for full setup.

---

## 4. Test data

- **Register** a new user via API or web for most scenarios.
- **Seed database** (optional, requires MongoDB URI): `cd backend && npm run seed`  
  - Admin: `admin@movierental.com` / `Admin123!`

---

## 5. API test cases

| ID | Scenario | Steps | Expected result | Priority |
|----|----------|-------|-----------------|----------|
| API-01 | Health check | GET `/` | 200, API running message | P1 |
| API-02 | Register | POST `/api/auth/register` with name, email, password | 201, token + user | P1 |
| API-03 | Register duplicate email | Register same email twice | Second request 400 | P2 |
| API-04 | Login success | POST `/api/auth/login` | 200, token | P1 |
| API-05 | Login wrong password | POST login with bad password | 401 | P1 |
| API-06 | Get profile | GET `/api/auth/me` with Bearer token | 200, user object | P1 |
| API-07 | Profile without token | GET `/api/auth/me` no header | 401 | P1 |
| API-08 | List movies | GET `/api/movies` | 200, movies array + pagination | P1 |
| API-09 | Movie by ID | GET `/api/movies/:id` valid id | 200, movie object | P1 |
| API-10 | Movie not found | GET `/api/movies/:id` invalid id | 404 | P2 |
| API-11 | Rent movie | POST `/api/rentals` with token + movieId | 201, active rental | P1 |
| API-12 | My rentals | GET `/api/rentals/my-rentals` with token | 200, rentals list | P1 |
| API-13 | Return movie | PUT `/api/rentals/:id/return` | 200, status returned | P1 |
| API-14 | Rent without token | POST `/api/rentals` no auth | 401 | P1 |
| API-15 | Admin create movie | POST `/api/movies` as admin | 201 | P2 |

Automated coverage: API-01, API-02, API-04–07, API-08–09, API-11–14 in `backend/tests/api.integration.test.js`.

---

## 6. Web UI test cases (manual)

| ID | Scenario | Steps | Expected result | Priority |
|----|----------|-------|-----------------|----------|
| WEB-01 | Home / movies load | Open `/`, browse movies | Movies visible, no console errors | P1 |
| WEB-02 | Register | Register new account | Redirect / success, logged in | P1 |
| WEB-03 | Login | Login existing user | Token stored, navbar shows user | P1 |
| WEB-04 | Movie detail | Open a movie page | Details match API | P1 |
| WEB-05 | Rent from web | Rent from detail or cart flow | Success message, rental in list | P1 |
| WEB-06 | My rentals | Open rentals page | Lists active rentals | P1 |
| WEB-07 | Return | Return a rented title | Copy available again in API | P1 |
| WEB-08 | Protected route | Visit profile without login | Redirect to login | P2 |

---

## 7. Mobile test cases (when React Native branch is ready)

| ID | Scenario | Expected result | Priority |
|----|----------|-----------------|----------|
| MOB-01 | API base URL points to backend | Requests reach Express | P1 |
| MOB-02 | Login / register | Same JWT flow as web | P1 |
| MOB-03 | Browse & rent | Same rental rules as API-11–13 | P1 |

---

## 8. Integration checklist (before merge to `main`)

- [ ] `cd backend && npm test` — all tests pass  
- [ ] Postman collection run — all requests green  
- [ ] WEB-01 through WEB-07 executed on latest `main`  
- [ ] API documentation updated if endpoints changed  
- [ ] No open P1 defects without team agreement  

---

## 9. Defect log template

| Date | ID | App | Summary | Steps | Expected | Actual | Status |
|------|-----|-----|---------|-------|----------|--------|--------|
| | | API / Web / Mobile | | | | | Open / Fixed |

---

## 10. Sign-off

| Role | Name | Signature / date |
|------|------|------------------|
| Integration & QA | Nosiphiwo Mshweshwe | |
| Backend | | |
| Angular | | |
| React Native | | |
