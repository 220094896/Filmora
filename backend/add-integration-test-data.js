const mongoose = require('mongoose');
const Genre = require('./models/Genre');
const Movie = require('./models/Movie');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const addIntegrationTestData = async () => {
  try {
    // Connect to in-memory database
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/filmora-test';
    
    await mongoose.connect(mongoUri);
    console.log('Connected to database');

    // Create test genre
    const genre = await Genre.create({
      name: 'Action',
      description: 'Action movies for testing'
    });
    console.log('Created genre:', genre.name);

    // Create test movie
    const movie = await Movie.create({
      title: 'Integration Test Movie',
      description: 'A movie for integration testing',
      genreId: genre._id,
      releaseYear: 2024,
      director: 'Test Director',
      cast: ['Test Actor 1', 'Test Actor 2'],
      duration: 120,
      rating: 7.5,
      rentalPrice: 49.99,
      image: 'https://example.com/test.jpg',
      totalCopies: 5,
      availableCopies: 5,
      isActive: true
    });
    console.log('Created movie:', movie.title);

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error adding test data:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

addIntegrationTestData();