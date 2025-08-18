const request = require('supertest');
const express = require('express');
const monetaryTransactionRoutes = require('../../routes/monetaryTransactionRoutes');
const monetaryTransactionController = require('../../controllers/monetaryTransactionController');

// Mock the monetaryTransactionController
jest.mock('../../controllers/monetaryTransactionController');

// Create a test app
const app = express();
app.use(express.json());
app.use('/transactions', monetaryTransactionRoutes);

describe('Monetary Transaction Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Transaction data is being saved OK', () => {
    it('should create a transaction successfully and return the transaction', async () => {
      const transactionData = { amount: 666, description: 'Test transaction' };
      const mockTransaction = {
        id: 1,
        ...transactionData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      monetaryTransactionController.createMonetaryTransaction.mockImplementation(
        (req, res) => {
          res.status(201).json(mockTransaction);
        }
      );

      const response = await request(app)
        .post('/transactions')
        .send(transactionData)
        .expect(201);

      expect(response.body).toMatchObject({
        id: mockTransaction.id,
        amount: mockTransaction.amount,
        description: mockTransaction.description,
      });
      expect(
        monetaryTransactionController.createMonetaryTransaction
      ).toHaveBeenCalled();
    });
  });
});
