const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  poster: { type: String },
  category: { type: String },
  link: { type: String },
  releaseYear: { type: String },
  duration: { type: String },
  rating: { type: Number }
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
