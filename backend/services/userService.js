const User = require('../models/User');

class UserService {
  // Create a new user
  async createUser(userData) {
    try {
      const user = await User.create(userData);
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Get all users
  async getAllUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  // Get user by ID
  async getUserById(id) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Update user
  async updateUser(id, userData) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      await user.update(userData);
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Delete user
  async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      await user.destroy();
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
