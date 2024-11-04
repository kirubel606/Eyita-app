const express = require('express');
const Movie = require('../models/MoviesModel');
const router = express.Router();

// Create a new movie
router.post('/', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Handle invalid IDs gracefully
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid movie ID format' });
    }
    res.status(500).json({ message: error.message });
  }
});



// Update a movie by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true // Run schema validation on update
    });

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;
