const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables
// Import routes
const userRoutes = require('./routes/User');       // Ensure this matches the filename
const movieRoutes = require('./routes/Movies');     // Ensure this matches
const promoRoutes = require('./routes/Promo');       // Ensure this matches
const advertRoutes = require('./routes/Advert');     // Ensure this matches
const seriesRoutes = require('./routes/Series');     // Ensure this matches

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors());
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/promos', promoRoutes);
app.use('/api/adverts', advertRoutes);
app.use('/api/series', seriesRoutes);

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Log every request
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}' at ${new Date().toISOString()}`);
  next();
});
