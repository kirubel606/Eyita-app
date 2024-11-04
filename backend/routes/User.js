const express = require('express');
const User = require('../models/UserModel'); // Adjust the model path if necessary
const bcrypt = require('bcrypt');
const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body; // Destructure password from body

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





router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Optionally return a token here if using JWT
    res.json(user); // Return user data for now
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});











module.exports = router;
