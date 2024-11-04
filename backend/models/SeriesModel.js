const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  episode_number: Number,
  title: String,
  link: String,
});

const seasonSchema = new mongoose.Schema({
  season_number: Number,
  episodes: [episodeSchema],
});

const seriesSchema = new mongoose.Schema({
  title: String,
  description: String,
  poster: String,
  category: String,
  viewCount: { type: Number, default: 0 },
  seasons: [seasonSchema],
});

const Series = mongoose.model('Series', seriesSchema);
module.exports = Series;
