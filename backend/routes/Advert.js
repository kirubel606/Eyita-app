const express = require('express');
const Advert = require('../models/AdvertModel');
const router = express.Router();

// Create a new advert
router.post('/', async (req, res) => {
  try {
    const newAdvert = new Advert(req.body);
    await newAdvert.save();
    res.status(201).json(newAdvert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all adverts
router.get('/', async (req, res) => {
  try {
    const adverts = await Advert.find();
    res.json(adverts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Other advert routes can be added here

module.exports = router;
