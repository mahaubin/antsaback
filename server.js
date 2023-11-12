import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import AuthRoute from './routes/auth.js';
import ProductRoute from './routes/product.js';
import CartRoute from './routes/cart.js';
import CommandeRoute from './routes/commande.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// connexion à la base de données
const connexionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('connected to mongo db');
  } catch (error) {
    throw error;
  }
};
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONT],
    credentials: true,
  })
);

// les différentes routes
app.use(express.static(path.join(__dirname, 'images')));
app.use('/api/auth', AuthRoute);
app.use('/api/products', ProductRoute);
app.use('/api/carts', CartRoute);
app.use('/api/commandes', CommandeRoute);

// error handler
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = 'Something went wrong!';
  return res.status(500).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
});
app.listen(process.env.PORT, () => {
  // appel à la fonction de la connexion base de données
  connexionDB();
  console.log(`the app is running in the port ${process.env.PORT}`);
});
