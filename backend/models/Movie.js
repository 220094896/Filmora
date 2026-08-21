const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    genreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genre',
      required: true
    },

    releaseYear: {
      type: Number,
      required: true
    },

    director: {
      type: String,
      required: true
    },

    cast: {
      type: [String],
      default: []
    },

    duration: {
      type: Number,
      required: true
    },

    rating: {
      type: Number,
      default: 0
    },

    rentalPrice: {
      type: Number,
      required: true
    },

    image: {
      type: String
    },

    totalCopies: {
      type: Number,
      required: true,
      default: 1
    },

    availableCopies: {
      type: Number,
      required: true,
      default: 1
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

movieSchema.index({
  title: 'text',
  description: 'text',
  director: 'text'
});

module.exports = mongoose.model('Movie', movieSchema);