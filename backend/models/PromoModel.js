const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  link: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  priority: { type: Number }
}, { timestamps: true });

const Promo = mongoose.model('Promo', promoSchema);
module.exports = Promo;
