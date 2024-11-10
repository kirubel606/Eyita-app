const express = require('express');
const User = require('../models/UserModel'); // Adjust the model path if necessary
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body; // Destructure password from body
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Ensure the password is provided
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = new User({
      username,
      email,
      passwordHash, // Use the hashed password
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const updates = {};

    // Update username and email if provided
    if (username) updates.username = username;
    if (email) updates.email = email;

    // If a new password is provided, hash it
    if (password) {
      updates.passwordHash = await bcrypt.hash(password, 10);
    }

    // Find the user by ID and update
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Other user routes can be added here





// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate JWT
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});











module.exports = router;
