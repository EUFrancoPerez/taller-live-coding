const userController = require('../../controllers/userController');
const userService = require('../../services/userService');

// Mock the userService
jest.mock('../../services/userService');

describe('UserController', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Setup mock request and response objects
    mockReq = {
      body: {},
      params: {},
      query: {},
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
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

      mockReq.body = userData;
      userService.createUser.mockResolvedValue(mockUser);

      await userController.createUser(mockReq, mockRes);

      expect(userService.createUser).toHaveBeenCalledWith(userData);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    it('should handle creation error', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com' };
      const error = new Error('Email already exists');

      mockReq.body = userData;
      userService.createUser.mockRejectedValue(error);

      await userController.createUser(mockReq, mockRes);

      expect(userService.createUser).toHaveBeenCalledWith(userData);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Email already exists',
      });
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      ];

      userService.getAllUsers.mockResolvedValue(mockUsers);

      await userController.getAllUsers(mockReq, mockRes);

      expect(userService.getAllUsers).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(mockUsers);
    });

    it('should handle fetch error', async () => {
      const error = new Error('Database connection failed');

      userService.getAllUsers.mockRejectedValue(error);

      await userController.getAllUsers(mockReq, mockRes);

      expect(userService.getAllUsers).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Database connection failed',
      });
    });
  });

  describe('getUserById', () => {
    it('should return user by ID', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };

      mockReq.params = { id: '1' };
      userService.getUserById.mockResolvedValue(mockUser);

      await userController.getUserById(mockReq, mockRes);

      expect(userService.getUserById).toHaveBeenCalledWith('1');
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 404 when user not found', async () => {
      mockReq.params = { id: '999' };
      userService.getUserById.mockResolvedValue(null);

      await userController.getUserById(mockReq, mockRes);

      expect(userService.getUserById).toHaveBeenCalledWith('999');
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should handle fetch error', async () => {
      const error = new Error('Database error');

      mockReq.params = { id: '1' };
      userService.getUserById.mockRejectedValue(error);

      await userController.getUserById(mockReq, mockRes);

      expect(userService.getUserById).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      const userData = {
        name: 'John Updated',
        email: 'john.updated@example.com',
      };
      const mockUser = { id: 1, ...userData };

      mockReq.params = { id: '1' };
      mockReq.body = userData;
      userService.updateUser.mockResolvedValue(mockUser);

      await userController.updateUser(mockReq, mockRes);

      expect(userService.updateUser).toHaveBeenCalledWith('1', userData);
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 404 when user not found', async () => {
      const userData = {
        name: 'John Updated',
        email: 'john.updated@example.com',
      };
      const error = new Error('User not found');

      mockReq.params = { id: '999' };
      mockReq.body = userData;
      userService.updateUser.mockRejectedValue(error);

      await userController.updateUser(mockReq, mockRes);

      expect(userService.updateUser).toHaveBeenCalledWith('999', userData);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should handle update error', async () => {
      const userData = {
        name: 'John Updated',
        email: 'john.updated@example.com',
      };
      const error = new Error('Validation error');

      mockReq.params = { id: '1' };
      mockReq.body = userData;
      userService.updateUser.mockRejectedValue(error);

      await userController.updateUser(mockReq, mockRes);

      expect(userService.updateUser).toHaveBeenCalledWith('1', userData);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Validation error' });
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      const result = { message: 'User deleted successfully' };

      mockReq.params = { id: '1' };
      userService.deleteUser.mockResolvedValue(result);

      await userController.deleteUser(mockReq, mockRes);

      expect(userService.deleteUser).toHaveBeenCalledWith('1');
      expect(mockRes.json).toHaveBeenCalledWith(result);
    });

    it('should return 404 when user not found', async () => {
      const error = new Error('User not found');

      mockReq.params = { id: '999' };
      userService.deleteUser.mockRejectedValue(error);

      await userController.deleteUser(mockReq, mockRes);

      expect(userService.deleteUser).toHaveBeenCalledWith('999');
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should handle delete error', async () => {
      const error = new Error('Database error');

      mockReq.params = { id: '1' };
      userService.deleteUser.mockRejectedValue(error);

      await userController.deleteUser(mockReq, mockRes);

      expect(userService.deleteUser).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });
});
