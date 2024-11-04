const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  profilePicture: { type: String },
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  role: { type: String, enum: ['admin', 'standard'], default: 'standard' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
