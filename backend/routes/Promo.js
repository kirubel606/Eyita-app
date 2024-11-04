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

module.exports = router;
