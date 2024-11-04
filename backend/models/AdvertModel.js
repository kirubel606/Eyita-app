const mongoose = require('mongoose');

const advertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  link: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  clickCount: { type: Number, default: 0 }
}, { timestamps: true });

const Advert = mongoose.model('Advert', advertSchema);
module.exports = Advert;
