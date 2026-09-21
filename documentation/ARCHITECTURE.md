# Architecture

## Runtime topology

```text
Browser
  |
  | Angular HTTP requests, JSON, Bearer token
  v
Angular client :4200
  |
  | CORS-enabled API calls
  v
Express API :5000
  |
  | Mongoose queries
  v
MongoDB
```

## Backend structure

- `app.js` creates the Express application, middleware, and route mounts. It is importable by tests.
- `server.js` loads environment variables, connects to MongoDB, and starts the listener.
- `routes/` maps HTTP methods and paths to controllers and middleware.
- `controllers/` validates requests and implements business operations.
- `middleware/authMiddleware.js` verifies JWTs and attaches the user to `req.user`.
- `middleware/adminMiddleware.js` restricts catalogue mutations to administrators.
- `models/` defines Mongoose schemas and collection relationships.
- `seed/seed.js` resets and populates development data.

## Frontend structure

- `pages/` contains route-level screens.
- `shared/` contains reusable UI components such as the navbar, footer, search bar, and movie card.
- `core/services/` contains API and client-state services.
- `core/guards/` protects authenticated and administrator routes.
- `core/interceptors/` adds authentication headers to outgoing requests.
- `models/` contains TypeScript response and domain types.

## Request flow

1. A page invokes an Angular service.
2. `HttpClient` creates an API request.
3. The interceptor may add a Bearer token.
4. Express parses JSON and dispatches the request to a route.
5. Authentication and role middleware run where configured.
6. The controller reads or changes MongoDB documents through Mongoose.
7. The controller returns JSON and an HTTP status.
8. The component updates its state or displays an error.

## Important boundaries

- `app.js` should remain free of listener startup and database connection side effects so tests can import it.
- `server.js` is the process entry point and should be the only place that starts the server.
- API clients should use response contracts documented in [API-REFERENCE.md](API-REFERENCE.md), not controller internals.
