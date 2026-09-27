const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/rentals', rentalRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Movie Rental API is running',
  });
});

module.exports = app;
