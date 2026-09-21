const express = require('express');
const Genre = require('../models/Genre');

const router = express.Router();

// Create genre (for testing purposes)
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Genre name is required' });
    }

    const genre = await Genre.create({
      name,
      description
    });

    res.status(201).json({
      message: 'Genre created successfully',
      genre
    });
  } catch (error) {
    console.error('Create genre error:', error);
    res.status(500).json({ message: 'Failed to create genre' });
  }
});

module.exports = router;