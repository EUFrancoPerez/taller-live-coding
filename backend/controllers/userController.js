const userService = require('../services/userService');

class UserController {
  // Create a new user
  async createUser(req, res) {
    try {
      const { name, email } = req.body;
      const user = await userService.createUser({ name, email });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get user by ID
  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update user
  async updateUser(req, res) {
    try {
      const { name, email } = req.body;
      const user = await userService.updateUser(req.params.id, { name, email });
      res.json(user);
    } catch (error) {
      if (error.message === 'User not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }

  // Delete user
  async deleteUser(req, res) {
    try {
      const result = await userService.deleteUser(req.params.id);
      res.json(result);
    } catch (error) {
      if (error.message === 'User not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

module.exports = new UserController();
