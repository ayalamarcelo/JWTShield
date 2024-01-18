const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Register

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'Successfully registered user' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);

    if (isMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Token auth

router.get('/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
