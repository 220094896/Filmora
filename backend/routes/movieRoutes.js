const express = require('express');

const {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/movieController');

const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

const router = express.Router();

// Public routes
router.get('/', getMovies);
router.get('/:id', getMovieById);

// Admin routes
router.post('/', protect, adminOnly, createMovie);
router.put('/:id', protect, adminOnly, updateMovie);
router.delete('/:id', protect, adminOnly, deleteMovie);

module.exports = router;