const express = require('express');
const router = express.Router();
const Series = require('../models/SeriesModel');

// Add a new series
router.post('/', async (req, res) => {
  try {
    const series = new Series(req.body);
    const savedSeries = await series.save();
    res.status(201).json(savedSeries);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Fetch all series
router.get('/', async (req, res) => {
  try {
    const seriesList = await Series.find();
    res.json(seriesList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Handle invalid IDs gracefully
router.get('/:id', async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    if (!series) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(series);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid movie ID format' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Update a series by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSeries = await Series.findByIdAndUpdate(req.params.id, req.body, {
      new: true,           // Return the updated document
      runValidators: true  // Ensure schema validation
    });
    
    if (!updatedSeries) return res.status(404).json({ message: "Series not found" });
    res.json(updatedSeries);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Delete a series by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID format (24-char hexadecimal string for MongoDB)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid series ID format" });
    }

    const deletedSeries = await Series.findByIdAndDelete(id);
    if (!deletedSeries) {
      return res.status(404).json({ message: "Series not found" });
    }

    res.json({ message: "Series deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
