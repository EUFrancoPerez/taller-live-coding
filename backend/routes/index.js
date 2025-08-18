const express = require('express');
const userRoutes = require('./userRoutes');
const monetaryTransactionRoutes = require('./monetaryTransactionRoutes');

const router = express.Router();

// Mount routes
router.use('/users', userRoutes);
router.use('/transactions', monetaryTransactionRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend funcionando 🚀' });
});

// Default route
router.get('/', (req, res) => {
  res.json({ mensaje: 'Hola desde el backend 👋' });
});

module.exports = router;
