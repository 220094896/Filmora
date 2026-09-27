# Member 4 Submission — Integration & QA

**Student name:** Nosiphiwo Mshweshwe  
**Student number:** 220094896  
**Module / project:** Filmora — cross-platform movie rental system  
**Team role:** Member 4 — Integration & QA Developer  

---

## Role description

As Integration & QA Developer I am responsible for:

1. **API integration** — Ensuring Angular (and React Native when delivered) use the same Express API contract, JWT authentication, and error handling.
2. **Testing** — Defining test cases, running manual web regression, maintaining automated API integration tests, and recording results.
3. **Documentation** — Maintaining API reference, setup guides, Postman collections, and test reports for the team and assessors.

Other members focus on implementation; I focus on **verification, documentation, and cross-team alignment**.

---

## Deliverables included in this repository

| # | Deliverable | Location |
|---|-------------|----------|
| 1 | API documentation (endpoints, auth, samples) | `documentation/api-documentation.md` |
| 2 | Test plan (API, web, mobile checklist) | `documentation/test-plan.md` |
| 3 | Integration setup guide | `documentation/integration-setup.md` |
| 4 | Integration test report (template + results) | `documentation/integration-test-report.md` |
| 5 | Postman collection + local environment | `documentation/postman/` |
| 6 | Automated API integration tests | `backend/tests/api.integration.test.js` |

---

## How to verify my work (for lecturer / marker)

1. Read `documentation/test-plan.md` for scope and test cases.
2. From project root:
   ```powershell
   cd backend
   npm install
   npm test
   ```
   All automated tests should pass.
3. Import Postman files from `documentation/postman/` and run the collection against a running backend (`npm start` in `backend`).
4. Optional: follow WEB-01–WEB-07 in the test plan with backend + Angular running.

---

## Team coordination

| Member | Role | Branch | I integrate with them by… |
|--------|------|--------|---------------------------|
| Member 1 | Angular | `frontend-angular` | Testing web against API; verifying service URLs |
| Member 2 | React Native | `mobile-react-native` | Same API/Postman flows on mobile |
| Member 3 | Backend | `backend-express` | Updating API docs when routes change; running regression |

---

## Statement of originality

I prepared the Integration & QA documentation and automated API tests listed above as my contribution to the Filmora group project.

**Name:** Nosiphiwo Mshweshwe  
**Date:** September 21, 2026

---

## Testing Results Summary

All integration testing has been completed successfully:

- **Automated API Tests:** 6/6 tests passing
  - Health check endpoint
  - Authentication flow (register, login, profile)
  - Movie listing and retrieval
  - Rental creation, listing, and return
  - Protected route authorization

- **Manual API Testing:** All endpoints verified via curl/Postman
  - Authentication endpoints working correctly
  - Movie API endpoints functional
  - Rental API endpoints operational
  - CORS enabled for frontend integration

- **Web Integration:** Angular application running successfully
  - Backend server operational on port 5000
  - Frontend server operational on port 4200
  - API integration ready for full testing with seeded data

- **Documentation:** Complete and up-to-date
  - API documentation with all endpoints
  - Integration setup guide with step-by-step instructions
  - Test plan with comprehensive test cases
  - Integration test report with execution results

**Status:** Integration & QA deliverables complete and ready for team review.
