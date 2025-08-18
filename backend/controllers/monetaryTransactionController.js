let idCounter = 1;
let transactions = [];

class MonetaryTransactionController {
  // Create a new monetary transaction
  async createMonetaryTransaction(req, res) {
    try {
      const { amount, description } = req.body;
      transactions.push({ id: idCounter, amount, description });
      idCounter++;
      res.status(201).json(this.getTransactions());
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get user by ID
  async getMonetaryTransactionById(req, res) {
    try {
      const transaction = transactions.find(
        (transaction) => transaction.id === Number(req.params.id)
      );
      if (transaction) {
        res.json(transaction);
      } else {
        res.status(404).json({ error: 'Transaction not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  getTransactions() {
    return transactions;
  }
}

module.exports = new MonetaryTransactionController();
