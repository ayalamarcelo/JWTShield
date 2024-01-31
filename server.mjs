// server.mjs
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de MongoDB
mongoose.connect('mongodb://localhost/jwt_auth');

app.use(express.json());


// Rutas
app.use('/auth', authRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
