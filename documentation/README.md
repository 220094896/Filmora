# Filmora Documentation

Filmora is a movie rental application with an Angular web client and an Express/MongoDB API.

## Start here

- [Project overview](PROJECT-OVERVIEW.md) - product scope, roles, and current capabilities
- [Development setup](SETUP.md) - prerequisites, environment variables, install, seed, and run commands
- [Architecture](ARCHITECTURE.md) - repository structure and runtime request flow
- [API reference](API-REFERENCE.md) - routes, authentication, request bodies, and response shapes
- [Data model](DATA-MODEL.md) - MongoDB collections and relationships
- [Frontend guide](FRONTEND-GUIDE.md) - Angular routes, services, guards, and local development
- [QA test plan](QA-TEST-PLAN.md) - automated checks, integration matrix, and release criteria
- [Deployment guide](DEPLOYMENT.md) - production configuration and operational checklist
- [Troubleshooting](TROUBLESHOOTING.md) - common setup and runtime failures

## Current implementation notes

- The backend exposes authentication, movie, and rental routes.
- The `Watchlist` model exists, but watchlist routes are not currently mounted.
- The frontend authentication service stores `token`, while the authentication interceptor currently reads `filmora_token`. This mismatch must be resolved before relying on authenticated browser workflows.
- The backend smoke tests run without MongoDB. Full rental and authentication integration tests require an isolated MongoDB database.
