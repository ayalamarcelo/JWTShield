import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.mjs';
import { authenticateToken } from '../middleware/authMiddleware.mjs';

const router = express.Router();
const SECRET_KEY = 'your_secret_key';

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: 'Usuario registrado con éxito' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
});

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Acceso permitido', user: req.user });
});

export default router;
