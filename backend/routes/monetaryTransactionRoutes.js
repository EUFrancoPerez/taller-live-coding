const express = require('express');
const monetaryTransactionController = require('../controllers/monetaryTransactionController');

const router = express.Router();

// Monetary transaction routes
router.post('/', monetaryTransactionController.createMonetaryTransaction);
router.get('/:id', monetaryTransactionController.getMonetaryTransactionById);

module.exports = router;
