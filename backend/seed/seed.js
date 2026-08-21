const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Genre = require('../models/Genre');
const Movie = require('../models/Movie');
const Rental = require('../models/Rental');
const Watchlist = require('../models/Watchlist');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');

    await User.deleteMany({});
    await Genre.deleteMany({});
    await Movie.deleteMany({});
    await Rental.deleteMany({});
    await Watchlist.deleteMany({});

    console.log('Existing data cleared.');

   const genres = await Genre.insertMany([
  {
    name: 'Action',
    description: 'Action-packed movies featuring adventure and excitement.'
  },
  {
    name: 'Adventure',
    description: 'Movies featuring exploration, adventure and discovery.'
  },
  {
    name: 'Animation',
    description: 'Animated movies suitable for a range of audiences.'
  },
  {
    name: 'Comedy',
    description: 'Movies designed to entertain and make audiences laugh.'
  },
  {
    name: 'Crime',
    description: 'Movies involving crime, investigations and criminals.'
  },
  {
    name: 'Drama',
    description: 'Story-driven movies focused on characters and emotional experiences.'
  },
  {
    name: 'Fantasy',
    description: 'Movies featuring magical and fantastical worlds.'
  },
  {
    name: 'Horror',
    description: 'Movies designed to frighten and create suspense.'
  },
  {
    name: 'Romance',
    description: 'Movies focused on romantic relationships and stories.'
  },
  {
    name: 'Science Fiction',
    description: 'Movies involving science, technology and futuristic concepts.'
  },
  {
    name: 'Thriller',
    description: 'Suspenseful movies designed to keep audiences engaged.'
  }
]);
const adminPassword = await bcrypt.hash('Admin123!', 10);
const userPassword = await bcrypt.hash('User123!', 10);

const users = await User.insertMany([
  {
    name: 'System Administrator',
    email: 'admin@movierental.com',
    password: adminPassword,
    role: 'admin'
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: userPassword,
    role: 'user'
  },
  {
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    password: userPassword,
    role: 'user'
  }
]);

const genreMap = {};

genres.forEach((genre) => {
  genreMap[genre.name] = genre._id;
});



const movies = await Movie.insertMany([
  {
    title: 'The Batman',
    description:
      'Batman investigates corruption and a series of mysterious crimes in Gotham City.',
    genreId: genreMap['Action'],
    releaseYear: 2022,
    director: 'Matt Reeves',
    cast: ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano'],
    duration: 176,
    rating: 7.8,
    rentalPrice: 50,
    image: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    totalCopies: 5,
    availableCopies: 5
  },

  {
    title: 'Inception',
    description:
      'A skilled thief enters the dreams of others to steal valuable information.',
    genreId: genreMap['Science Fiction'],
    releaseYear: 2010,
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    duration: 148,
    rating: 8.8,
    rentalPrice: 45,
    image: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    totalCopies: 4,
    availableCopies: 4
  },

  {
    title: 'Interstellar',
    description:
      'Explorers travel through a wormhole in search of a new home for humanity.',
    genreId: genreMap['Science Fiction'],
    releaseYear: 2014,
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    duration: 169,
    rating: 8.7,
    rentalPrice: 50,
    image: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    totalCopies: 4,
    availableCopies: 4
  },

  {
    title: 'The Dark Knight',
    description:
      'Batman faces a dangerous criminal mastermind who plunges Gotham into chaos.',
    genreId: genreMap['Action'],
    releaseYear: 2008,
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    duration: 152,
    rating: 9.0,
    rentalPrice: 50,
    image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    totalCopies: 5,
    availableCopies: 5
  },

  {
    title: 'Toy Story',
    description:
      'A group of toys comes to life when their owner is not around.',
    genreId: genreMap['Animation'],
    releaseYear: 1995,
    director: 'John Lasseter',
    cast: ['Tom Hanks', 'Tim Allen', 'Don Rickles'],
    duration: 81,
    rating: 8.3,
    rentalPrice: 30,
    image: 'https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg',
    totalCopies: 6,
    availableCopies: 6
  },

  {
    title: 'The Hangover',
    description:
      'Three friends try to piece together what happened after a wild night in Las Vegas.',
    genreId: genreMap['Comedy'],
    releaseYear: 2009,
    director: 'Todd Phillips',
    cast: ['Bradley Cooper', 'Ed Helms', 'Zach Galifianakis'],
    duration: 100,
    rating: 7.7,
    rentalPrice: 35,
    image: 'https://image.tmdb.org/t/p/w500/uluhlXubGu1VxU63X9VHCLWDAYP.jpg',
    totalCopies: 5,
    availableCopies: 5
  },

  {
    title: 'The Conjuring',
    description:
      'Paranormal investigators help a family experiencing terrifying supernatural events.',
    genreId: genreMap['Horror'],
    releaseYear: 2013,
    director: 'James Wan',
    cast: ['Vera Farmiga', 'Patrick Wilson', 'Lili Taylor'],
    duration: 112,
    rating: 7.5,
    rentalPrice: 40,
    image: 'https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg',
    totalCopies: 4,
    availableCopies: 4
  },

  {
    title: 'The Notebook',
    description:
      'A young couple falls deeply in love despite social and personal challenges.',
    genreId: genreMap['Romance'],
    releaseYear: 2004,
    director: 'Nick Cassavetes',
    cast: ['Ryan Gosling', 'Rachel McAdams', 'James Garner'],
    duration: 123,
    rating: 7.8,
    rentalPrice: 35,
    image: 'https://image.tmdb.org/t/p/w500/rNzQyW4f8B8cQeg7Dgj3nX2v7mD.jpg',
    totalCopies: 5,
    availableCopies: 5
  },

  {
    title: 'The Godfather',
    description:
      'The aging patriarch of a powerful crime family transfers control of his empire.',
    genreId: genreMap['Crime'],
    releaseYear: 1972,
    director: 'Francis Ford Coppola',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    duration: 175,
    rating: 9.2,
    rentalPrice: 45,
    image: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    totalCopies: 3,
    availableCopies: 3
  },

  {
    title: 'The Lord of the Rings',
    description:
      'A young hobbit begins a dangerous journey to destroy a powerful magical ring.',
    genreId: genreMap['Fantasy'],
    releaseYear: 2001,
    director: 'Peter Jackson',
    cast: ['Elijah Wood', 'Ian McKellen', 'Viggo Mortensen'],
    duration: 178,
    rating: 8.8,
    rentalPrice: 50,
    image: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkblH8Q7A.jpg',
    totalCopies: 5,
    availableCopies: 5
  }
]);
const john = users.find(
  (user) => user.email === 'john@example.com'
);

const sarah = users.find(
  (user) => user.email === 'sarah@example.com'
);

const batman = movies.find(
  (movie) => movie.title === 'The Batman'
);

const inception = movies.find(
  (movie) => movie.title === 'Inception'
);

const rental1 = await Rental.create({
  userId: john._id,
  movieId: batman._id,
  rentalDate: new Date(),
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  status: 'active',
  price: batman.rentalPrice
});

const rental2 = await Rental.create({
  userId: sarah._id,
  movieId: inception._id,
  rentalDate: new Date(),
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  status: 'active',
  price: inception.rentalPrice
});

await Movie.findByIdAndUpdate(
  batman._id,
  { $inc: { availableCopies: -1 } }
);

await Movie.findByIdAndUpdate(
  inception._id,
  { $inc: { availableCopies: -1 } }
);

console.log('Test rentals created.');

const interstellar = movies.find(
  (movie) => movie.title === 'Interstellar'
);

const godfather = movies.find(
  (movie) => movie.title === 'The Godfather'
);

await Watchlist.insertMany([
  {
    userId: john._id,
    movieId: interstellar._id
  },
  {
    userId: sarah._id,
    movieId: godfather._id
  }
]);

console.log('Test watchlists created.');

console.log(`${movies.length} movies created.`);

console.log(`${users.length} users created.`);

console.log(`${genres.length} genres created.`);

    console.log('Database seeded successfully.');

    await mongoose.connection.close();
    console.log('MongoDB connection closed.');

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedDatabase();