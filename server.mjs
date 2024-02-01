import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/jwt_auth');

app.use(express.json());

app.use('/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
