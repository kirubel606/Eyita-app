const mongoose = require('mongoose');

const advertSchema = new mongoose.Schema({
  link1: { type: String, required: true },
  link2: { type: String, required: true },
  link3: { type: String, required: true },
  adClient: { type: String, required: true },
});

const Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert;
