const express = require('express');
const userRoutes = require('./userRoutes');

const router = express.Router();

// Mount routes
router.use('/users', userRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend funcionando 🚀' });
});

// Default route
router.get('/', (req, res) => {
  res.json({ mensaje: 'Hola desde el backend 👋' });
});

module.exports = router;
