const Rental = require('../models/Rental');
const Movie = require('../models/Movie');


// ==========================================
// CREATE RENTAL
// ==========================================

const createRental = async (req, res) => {
    try {
        const { movieId } = req.body;

        if (!movieId) {
            return res.status(400).json({
                message: 'Movie ID is required'
            });
        }

        // Find movie
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({
                message: 'Movie not found'
            });
        }

        // Check if movie is active
        if (!movie.isActive) {
            return res.status(400).json({
                message: 'This movie is no longer available'
            });
        }

        // Check available copies
        if (movie.availableCopies <= 0) {
            return res.status(400).json({
                message: 'No copies of this movie are currently available'
            });
        }

        // Check if user already has this movie
        const existingRental = await Rental.findOne({
            userId: req.user._id,
            movieId: movieId,
            status: 'active'
        });

        if (existingRental) {
            return res.status(400).json({
                message: 'You already have this movie rented'
            });
        }

        // Rental period = 7 days
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7);

        // Create rental
        const rental = await Rental.create({
            userId: req.user._id,
            movieId: movieId,
            dueDate: dueDate,
            status: 'active'
        });

        // Reduce available copies
        movie.availableCopies -= 1;

        await movie.save();

        // Return populated rental
        const populatedRental = await Rental.findById(rental._id)
            .populate('movieId', 'title rentalPrice image')
            .populate('userId', 'name email');

        res.status(201).json({
            message: 'Movie rented successfully',
            rental: populatedRental
        });

    } catch (error) {
        console.error('Create rental error:', error);

        res.status(500).json({
            message: 'Failed to rent movie'
        });
    }
};


// ==========================================
// GET MY RENTALS
// ==========================================

const getMyRentals = async (req, res) => {
    try {

        const rentals = await Rental.find({
            userId: req.user._id
        })
            .populate('movieId', 'title rentalPrice image')
            .sort({ createdAt: -1 });

        res.json({
            rentals
        });

    } catch (error) {

        console.error('Get rentals error:', error);

        res.status(500).json({
            message: 'Failed to retrieve rentals'
        });
    }
};


// ==========================================
// RETURN MOVIE
// ==========================================

const returnMovie = async (req, res) => {
    try {

        const rental = await Rental.findById(req.params.id);

        if (!rental) {
            return res.status(404).json({
                message: 'Rental not found'
            });
        }

        // Make sure user owns this rental
        if (
            rental.userId.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: 'You can only return your own rentals'
            });
        }

        // Check if already returned
        if (rental.status === 'returned') {
            return res.status(400).json({
                message: 'This movie has already been returned'
            });
        }

        // Update rental
        rental.status = 'returned';
        rental.returnDate = new Date();

        await rental.save();

        // Increase movie availability
        const movie = await Movie.findById(rental.movieId);

        if (movie) {
            movie.availableCopies += 1;
            await movie.save();
        }

        res.json({
            message: 'Movie returned successfully',
            rental
        });

    } catch (error) {

        console.error('Return movie error:', error);

        res.status(500).json({
            message: 'Failed to return movie'
        });
    }
};


module.exports = {
    createRental,
    getMyRentals,
    returnMovie
};