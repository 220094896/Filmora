const request = require('supertest');
const app = require('./app');

const addTestMovie = async () => {
  try {
    // First, create a genre
    const genreResponse = await request(app)
      .post('/api/genres')
      .send({
        name: 'Action',
        description: 'Action movies'
      });

    console.log('Genre response:', genreResponse.status, genreResponse.body);

    // If genre endpoint doesn't exist, we'll need to add it or work around it
    // For now, let's try to add a movie with a mock genre ID
    const movieResponse = await request(app)
      .post('/api/movies')
      .send({
        title: 'Test Movie for Integration',
        description: 'A test movie for integration testing',
        genreId: '507f1f77bcf86cd799439011', // Mock MongoDB ObjectId
        releaseYear: 2024,
        director: 'Test Director',
        duration: 120,
        rentalPrice: 49.99,
        totalCopies: 5
      });

    console.log('Movie response:', movieResponse.status, movieResponse.body);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

addTestMovie();