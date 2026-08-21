const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        movieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
            required: true
        },

        rentalDate: {
            type: Date,
            default: Date.now
        },

        dueDate: {
            type: Date,
            required: true
        },

        returnDate: {
            type: Date,
            default: null
        },

        status: {
            type: String,
            enum: ['active', 'returned', 'overdue'],
            default: 'active'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Rental', rentalSchema);