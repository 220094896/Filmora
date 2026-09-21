const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const mongoose = require('mongoose');
const Genre = require('../models/Genre');
const Movie = require('../models/Movie');
const {
  connectTestDatabase,
  disconnectTestDatabase,
} = require('./helpers/testDb');

process.env.JWT_SECRET = 'filmora-test-jwt-secret';
process.env.MONGODB_URI = '';

let app;

test.before(async () => {
  await connectTestDatabase();
  app = require('../app');
});

test.beforeEach(async () => {
  // Clear all collections before each test to avoid duplicate key errors
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

test.after(async () => {
  await disconnectTestDatabase();
});

async function seedMovie() {
  const genreName = `Action-${Date.now()}`;
  const genre = await Genre.create({
    name: genreName,
    description: 'Action movies',
  });

  const movie = await Movie.create({
    title: 'Integration Test Movie',
    description: 'Used by automated integration tests',
    genreId: genre._id,
    releaseYear: 2024,
    director: 'Test Director',
    duration: 120,
    rentalPrice: 49.99,
    totalCopies: 2,
    availableCopies: 2,
    isActive: true,
  });

  return { genre, movie };
}

test('GET / returns API health message', async () => {
  const response = await request(app).get('/');

  assert.equal(response.status, 200);
  assert.match(response.body.message, /running/i);
});

test('Auth flow: register, login, get profile', async () => {
  const email = `qa.user.${Date.now()}@filmora.test`;

  const registerResponse = await request(app).post('/api/auth/register').send({
    name: 'QA Tester',
    email,
    password: 'Password123!',
  });

  assert.equal(registerResponse.status, 201);
  assert.ok(registerResponse.body.token);
  assert.equal(registerResponse.body.user.email, email);

  const loginResponse = await request(app).post('/api/auth/login').send({
    email,
    password: 'Password123!',
  });

  assert.equal(loginResponse.status, 200);
  assert.ok(loginResponse.body.token);

  const meResponse = await request(app)
    .get('/api/auth/me')
    .set('Authorization', `Bearer ${loginResponse.body.token}`);

  assert.equal(meResponse.status, 200);
  assert.equal(meResponse.body.user.email, email);
});

test('Auth rejects login with wrong password', async () => {
  const email = `wrong.pass.${Date.now()}@filmora.test`;

  await request(app).post('/api/auth/register').send({
    name: 'Wrong Pass User',
    email,
    password: 'Password123!',
  });

  const loginResponse = await request(app).post('/api/auth/login').send({
    email,
    password: 'NotTheRightPassword',
  });

  assert.equal(loginResponse.status, 401);
});

test('Movies: list and get by id', async () => {
  const { movie } = await seedMovie();

  const listResponse = await request(app).get('/api/movies');

  assert.equal(listResponse.status, 200);
  assert.ok(Array.isArray(listResponse.body.movies));
  assert.ok(listResponse.body.movies.length >= 1);
  assert.ok(listResponse.body.pagination);

  const detailResponse = await request(app).get(`/api/movies/${movie._id}`);

  assert.equal(detailResponse.status, 200);
  assert.equal(detailResponse.body.movie.title, movie.title);
});

test('Rentals: create, list, return', async () => {
  const { movie } = await seedMovie();
  const email = `renter.${Date.now()}@filmora.test`;

  const registerResponse = await request(app).post('/api/auth/register').send({
    name: 'Renter User',
    email,
    password: 'Password123!',
  });

  const token = registerResponse.body.token;

  const rentResponse = await request(app)
    .post('/api/rentals')
    .set('Authorization', `Bearer ${token}`)
    .send({ movieId: movie._id.toString() });

  assert.equal(rentResponse.status, 201);
  assert.equal(rentResponse.body.rental.status, 'active');

  const listResponse = await request(app)
    .get('/api/rentals/my-rentals')
    .set('Authorization', `Bearer ${token}`);

  assert.equal(listResponse.status, 200);
  assert.equal(listResponse.body.rentals.length, 1);

  const rentalId = listResponse.body.rentals[0]._id;

  const returnResponse = await request(app)
    .put(`/api/rentals/${rentalId}/return`)
    .set('Authorization', `Bearer ${token}`)
    .send({});

  assert.equal(returnResponse.status, 200);
  assert.equal(returnResponse.body.rental.status, 'returned');
});

test('Protected routes reject missing token', async () => {
  const response = await request(app).get('/api/rentals/my-rentals');

  assert.equal(response.status, 401);
});
