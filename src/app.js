const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});