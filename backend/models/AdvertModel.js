const mongoose = require('mongoose');

const advertSchema = new mongoose.Schema({
  adSlot1: { type: String, required: true },
  adSlot2: { type: String, required: true },
  adSlot3: { type: String, required: true },
  adClient: { type: String, required: true },
});

const Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert;
