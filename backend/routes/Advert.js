const express = require('express');
const Advert = require('../models/AdvertModel');
const router = express.Router();

// Define the advert route correctly
router.get('/', async (req, res) => {
  try {
    const advert = await Advert.findOne();
    if (!advert) {
      return res.status(404).json({ message: 'Advert not found' });
    }
    res.json(advert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/', async (req, res) => {
  try {
    let advert = await Advert.findOne();
    if (advert) {
      // Update advert
      advert.link1 = req.body.link1 || advert.link1;
      advert.link2 = req.body.link2 || advert.link2;
      advert.link3 = req.body.link3 || advert.link3;
      advert.adClient = req.body.adClient || advert.adClient;

      await advert.save();
      return res.status(200).json(advert); // 200 OK
    } else {
      // Create new advert
      advert = new Advert(req.body);
      await advert.save();
      return res.status(201).json(advert); // 201 Created
    }
  } catch (error) {
    console.error("Error saving advert:", error); // Log the error
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
