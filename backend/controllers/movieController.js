const Movie = require('../models/Movie');
const Genre = require('../models/Genre');

const getMovies = async (req, res) => {
    try {
        const {
            search,
            genre,
            page = 1,
            limit = 10
        } = req.query;

        const filter = {
            isActive: true
        };

        // Search movies
        if (search) {
            filter.$text = {
                $search: search
            };
        }

        // Filter by genre name
        if (genre) {
            const genreDocument = await Genre.findOne({
                name: {
                    $regex: `^${genre}$`,
                    $options: 'i'
                }
            });

            if (!genreDocument) {
                return res.json({
                    movies: [],
                    pagination: {
                        page: Number(page),
                        limit: Number(limit),
                        total: 0,
                        pages: 0
                    }
                });
            }

            filter.genreId = genreDocument._id;
        }

        const skip = (Number(page) - 1) * Number(limit);

        const movies = await Movie.find(filter)
            .populate('genreId', 'name description')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const total = await Movie.countDocuments(filter);

        res.json({
            movies,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        });
    } catch (error) {
        console.error('Get movies error:', error);

        res.status(500).json({
            message: 'Failed to retrieve movies'
        });
    }
};

const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
            .populate('genreId', 'name description');

        if (!movie) {
            return res.status(404).json({
                message: 'Movie not found'
            });
        }

        res.json({
            movie
        });
    } catch (error) {
        console.error('Get movie error:', error);

        res.status(500).json({
            message: 'Failed to retrieve movie'
        });
    }
};


const createMovie = async (req, res) => {
    try {
        const {
            title,
            description,
            genreId,
            releaseYear,
            director,
            cast,
            duration,
            rating,
            rentalPrice,
            image,
            totalCopies
        } = req.body;

        if (
            !title ||
            !description ||
            !genreId ||
            !releaseYear ||
            !director ||
            !duration ||
            rentalPrice === undefined ||
            totalCopies === undefined
        ) {
            return res.status(400).json({
                message: 'Please provide all required movie fields'
            });
        }

        const genreExists = await Genre.findById(genreId);

        if (!genreExists) {
            return res.status(400).json({
                message: 'Genre not found'
            });
        }

        const movie = await Movie.create({
            title,
            description,
            genreId,
            releaseYear,
            director,
            cast: cast || [],
            duration,
            rating: rating || 0,
            rentalPrice,
            image,
            totalCopies,
            availableCopies: totalCopies,
            isActive: true
        });

        const populatedMovie = await Movie.findById(movie._id)
            .populate('genreId', 'name description');

        res.status(201).json({
            message: 'Movie created successfully',
            movie: populatedMovie
        });

    } catch (error) {
        console.error('Create movie error:', error);

        res.status(500).json({
            message: 'Failed to create movie'
        });
    }
};
const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                message: 'Movie not found'
            });
        }

        const {
            title,
            description,
            genreId,
            releaseYear,
            director,
            cast,
            duration,
            rating,
            rentalPrice,
            image,
            totalCopies,
            isActive
        } = req.body;

        if (genreId) {
            const genreExists = await Genre.findById(genreId);

            if (!genreExists) {
                return res.status(400).json({
                    message: 'Genre not found'
                });
            }

            movie.genreId = genreId;
        }

        if (title !== undefined) movie.title = title;
        if (description !== undefined) movie.description = description;
        if (releaseYear !== undefined) movie.releaseYear = releaseYear;
        if (director !== undefined) movie.director = director;
        if (cast !== undefined) movie.cast = cast;
        if (duration !== undefined) movie.duration = duration;
        if (rating !== undefined) movie.rating = rating;
        if (rentalPrice !== undefined) movie.rentalPrice = rentalPrice;
        if (image !== undefined) movie.image = image;
        if (isActive !== undefined) movie.isActive = isActive;

        if (totalCopies !== undefined) {
            const rentedCopies =
                movie.totalCopies - movie.availableCopies;

            if (totalCopies < rentedCopies) {
                return res.status(400).json({
                    message:
                        'Total copies cannot be less than the number currently rented'
                });
            }

            movie.totalCopies = totalCopies;
            movie.availableCopies = totalCopies - rentedCopies;
        }

        await movie.save();
        

        const updatedMovie = await Movie.findById(movie._id)
            .populate('genreId', 'name description');

        res.json({
            message: 'Movie updated successfully',
            movie: updatedMovie
        });

    } catch (error) {
        console.error('Update movie error:', error);

        res.status(500).json({
            message: 'Failed to update movie'
        });
    }
};
const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                message: 'Movie not found'
            });
        }

        movie.isActive = false;

        await movie.save();

        res.json({
            message: 'Movie removed successfully'
        });

    } catch (error) {
        console.error('Delete movie error:', error);

        res.status(500).json({
            message: 'Failed to delete movie'
        });
    }
};

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};
