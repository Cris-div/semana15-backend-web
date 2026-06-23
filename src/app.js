const express = require('express');
const cors = require('cors');

const productsRouter = require('./routes/products');
const authRoutes = require('./routes/authRoutes');
const categoriesRouter = require('./routes/categories');

const app = express();

const configuredOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = [
  ...configuredOrigins,
  process.env.FRONTEND_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  'http://localhost:3000',
  'http://localhost:3001',
  'https://semana15-fronted-web.vercel.app'
].filter(Boolean);

// Middlewares
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origen no permitido por CORS'));
  },
  credentials: true
}));
app.use(express.json());

// Rutas API
app.use('/api/products', productsRouter);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoriesRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'API E-commerce funcionando'
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada'
  });
});

module.exports = app;
