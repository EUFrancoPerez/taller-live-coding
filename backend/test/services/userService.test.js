const userService = require('../../services/userService');
const User = require('../../models/User');

// Mock the User model
jest.mock('../../models/User');

describe('UserService', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com' };
      const mockUser = {
        id: 1,
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      User.create.mockResolvedValue(mockUser);

      const result = await userService.createUser(userData);

      expect(User.create).toHaveBeenCalledWith(userData);
      expect(result).toEqual(mockUser);
    });

    it('should throw error when user creation fails', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com' };
      const error = new Error('Database error');

      User.create.mockRejectedValue(error);

      await expect(userService.createUser(userData)).rejects.toThrow(
        'Database error'
      );
      expect(User.create).toHaveBeenCalledWith(userData);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      ];

      User.findAll.mockResolvedValue(mockUsers);

      const result = await userService.getAllUsers();

      expect(User.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });

    it('should throw error when fetching users fails', async () => {
      const error = new Error('Database connection failed');

      User.findAll.mockRejectedValue(error);

      await expect(userService.getAllUsers()).rejects.toThrow(
        'Database connection failed'
      );
      expect(User.findAll).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should return user by ID', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };

      User.findByPk.mockResolvedValue(mockUser);

      const result = await userService.getUserById(1);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });

    it('should return null when user not found', async () => {
      User.findByPk.mockResolvedValue(null);

      const result = await userService.getUserById(999);

      expect(User.findByPk).toHaveBeenCalledWith(999);
      expect(result).toBeNull();
    });

    it('should throw error when fetching user fails', async () => {
      const error = new Error('Database error');

      User.findByPk.mockRejectedValue(error);

      await expect(userService.getUserById(1)).rejects.toThrow(
        'Database error'
      );
      expect(User.findByPk).toHaveBeenCalledWith(1);
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      const userData = {
        name: 'John Updated',
        email: 'john.updated@example.com',
      };
      const mockUser = {
        id: 1,
        ...userData,
        update: jest.fn().mockResolvedValue(true),
      };

      User.findByPk.mockResolvedValue(mockUser);

      const result = await userService.updateUser(1, userData);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(mockUser.update).toHaveBeenCalledWith(userData);
      expect(result).toEqual(mockUser);
    });

    it('should throw error when user not found', async () => {
      const userData = {
        name: 'John Updated',
        email: 'john.updated@example.com',
      };

      User.findByPk.mockResolvedValue(null);

      await expect(userService.updateUser(999, userData)).rejects.toThrow(
        'User not found'
      );
      expect(User.findByPk).toHaveBeenCalledWith(999);
    });

    it('should throw error when update fails', async () => {
      const userData = {
        name: 'John Updated',
        email: 'john.updated@example.com',
      };
      const mockUser = {
        id: 1,
        update: jest.fn().mockRejectedValue(new Error('Update failed')),
      };

      User.findByPk.mockResolvedValue(mockUser);

      await expect(userService.updateUser(1, userData)).rejects.toThrow(
        'Update failed'
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        destroy: jest.fn().mockResolvedValue(true),
      };

      User.findByPk.mockResolvedValue(mockUser);

      const result = await userService.deleteUser(1);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(mockUser.destroy).toHaveBeenCalled();
      expect(result).toEqual({ message: 'User deleted successfully' });
    });

    it('should throw error when user not found', async () => {
      User.findByPk.mockResolvedValue(null);

      await expect(userService.deleteUser(999)).rejects.toThrow(
        'User not found'
      );
      expect(User.findByPk).toHaveBeenCalledWith(999);
    });

    it('should throw error when delete fails', async () => {
      const mockUser = {
        id: 1,
        destroy: jest.fn().mockRejectedValue(new Error('Delete failed')),
      };

      User.findByPk.mockResolvedValue(mockUser);

      await expect(userService.deleteUser(1)).rejects.toThrow('Delete failed');
    });
  });
});
