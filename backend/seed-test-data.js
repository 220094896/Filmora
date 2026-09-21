const mongoose = require('mongoose');
const Genre = require('./models/Genre');
const Movie = require('./models/Movie');
const dotenv = require('dotenv');

dotenv.config();

const seedTestData = async () => {
  try {
    // Connect to the same database as the running server
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/filmora-test';
    
    await mongoose.connect(mongoUri);
    console.log('Connected to database');

    // Clear existing test data
    await Genre.deleteMany({});
    await Movie.deleteMany({});
    console.log('Cleared existing test data');

    // Create test genres
    const actionGenre = await Genre.create({
      name: 'Action',
      description: 'Action-packed movies'
    });

    const scifiGenre = await Genre.create({
      name: 'Science Fiction',
      description: 'Sci-fi movies'
    });

    const comedyGenre = await Genre.create({
      name: 'Comedy',
      description: 'Funny movies'
    });

    console.log('Created test genres');

    // Create test movies
    const movies = await Movie.create([
      {
        title: 'Test Action Movie',
        description: 'An action-packed test movie',
        genreId: actionGenre._id,
        releaseYear: 2024,
        director: 'Test Director',
        cast: ['Actor 1', 'Actor 2'],
        duration: 120,
        rating: 7.5,
        rentalPrice: 49.99,
        image: 'https://example.com/action.jpg',
        totalCopies: 5,
        availableCopies: 5,
        isActive: true
      },
      {
        title: 'Test Sci-Fi Movie',
        description: 'A science fiction test movie',
        genreId: scifiGenre._id,
        releaseYear: 2023,
        director: 'Sci-Fi Director',
        cast: ['Future Actor 1', 'Future Actor 2'],
        duration: 140,
        rating: 8.0,
        rentalPrice: 39.99,
        image: 'https://example.com/scifi.jpg',
        totalCopies: 3,
        availableCopies: 3,
        isActive: true
      },
      {
        title: 'Test Comedy Movie',
        description: 'A hilarious test movie',
        genreId: comedyGenre._id,
        releaseYear: 2022,
        director: 'Comedy Director',
        cast: ['Funny Actor 1', 'Funny Actor 2'],
        duration: 90,
        rating: 6.5,
        rentalPrice: 29.99,
        image: 'https://example.com/comedy.jpg',
        totalCopies: 4,
        availableCopies: 4,
        isActive: true
      }
    ]);

    console.log(`Created ${movies.length} test movies`);

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding test data:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedTestData();