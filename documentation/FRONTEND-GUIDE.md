# Frontend Guide

## Application routes

| Route | Component | Access |
| --- | --- | --- |
| `/` | Home | Public |
| `/movies` | Movies | Public |
| `/movies/:id` | Movie detail | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/cart` | Cart | Public route currently; checkout calls protected rental API |
| `/rentals` | Rentals | Authenticated users |
| `/admin` | Admin | Authenticated administrators |

Unknown paths redirect to `/`.

## Services

- `AuthService` registers, logs in, stores client auth data, exposes login/admin checks, and logs out.
- `MovieService` reads the catalogue and sends administrator movie mutations.
- `RentalService` creates rentals, loads the current user's rentals, and returns movies.
- `CartService` manages the client-side cart state used during checkout.

## Guards and interceptor

- `authGuard` protects the rentals page.
- `adminGuard` protects the admin page after authentication.
- `authInterceptor` is intended to add `Authorization: Bearer <token>` to API calls.

### Known authentication integration issue

`AuthService` currently stores the JWT under `token`, while `authInterceptor` reads `filmora_token`. As a result, login can appear successful while subsequent protected API requests omit the token. Align these storage keys before treating browser rental/admin flows as release-ready, then add a regression test around login followed by an authenticated request.

## Adding a page

1. Create the page component under `src/app/pages/<feature>`.
2. Add its route to `src/app/app.routes.ts`.
3. Add a guard when the page requires authentication or administrator access.
4. Put API calls in a core service rather than directly in the component.
5. Add a component spec and cover loading, success, empty, and error states.
6. Keep reusable visual pieces in `src/app/shared`.

## Local frontend checks

```powershell
cd frontend/filmora-web
npm test -- --watch=false --browsers=ChromeHeadless
npm run build
```

The build currently reports an initial bundle budget warning and Bootstrap selector warnings. These should be tracked separately from compilation failures.
