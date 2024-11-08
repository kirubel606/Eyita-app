const express = require('express');
const Promo = require('../models/PromoModel');
const router = express.Router();

// Create a new promo
router.post('/', async (req, res) => {
  try {
    const newPromo = new Promo(req.body);
    await newPromo.save();
    res.status(201).json(newPromo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all promos
router.get('/', async (req, res) => {
  try {
    const promos = await Promo.find();
    res.json(promos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Other promo routes can be added here

// Update a promo by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPromo = await Promo.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true // Run schema validation on update
    });

    if (!updatedPromo) {
      return res.status(404).json({ message: 'Promo not found' });
    }

    res.json(updatedPromo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a promo by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPromo = await Promo.findByIdAndDelete(id);

    if (!deletedPromo) {
      return res.status(404).json({ message: 'Promo not found' });
    }

    res.json({ message: 'Promo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
