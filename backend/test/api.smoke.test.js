const test = require('node:test');
const assert = require('node:assert/strict');

const createApp = require('../app');

const request = async (app, path, options = {}) => {
  const server = app.listen(0);

  try {
    const address = server.address();
    const response = await fetch(`http://127.0.0.1:${address.port}${path}`, options);
    const body = await response.json();

    return { response, body };
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
};

test('GET / exposes the API availability contract without a database', async () => {
  const { response, body } = await request(createApp(), '/');

  assert.equal(response.status, 200);
  assert.deepEqual(body, { message: 'Movie Rental API is running' });
});

test('protected API routes reject requests without a bearer token', async () => {
  const { response, body } = await request(createApp(), '/api/auth/me');

  assert.equal(response.status, 401);
  assert.equal(body.message, 'Not authorized, no token');
});