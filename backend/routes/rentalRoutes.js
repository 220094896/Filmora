const express = require('express');

const {
    createRental,
    getMyRentals,
    returnMovie
} = require('../controllers/rentalController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();


// Rent a movie
router.post('/', protect, createRental);


// View logged-in user's rentals
router.get('/my-rentals', protect, getMyRentals);


// Return a movie
router.put('/:id/return', protect, returnMovie);


module.exports = router;