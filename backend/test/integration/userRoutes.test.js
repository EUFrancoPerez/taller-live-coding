const request = require('supertest');
const express = require('express');
const userRoutes = require('../../routes/userRoutes');
const userController = require('../../controllers/userController');

// Mock the userController
jest.mock('../../controllers/userController');

// Create a test app
const app = express();
app.use(express.json());
app.use('/users', userRoutes);

describe('User Routes Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /users', () => {
    it('should create a user successfully', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com' };
      const mockUser = {
        id: 1,
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      userController.createUser.mockImplementation((req, res) => {
        res.status(201).json(mockUser);
      });

      const response = await request(app)
        .post('/users')
        .send(userData)
        .expect(201);

      expect(response.body).toMatchObject({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
      });
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
      expect(userController.createUser).toHaveBeenCalled();
    });

    it('should handle validation errors', async () => {
      const userData = { name: '', email: 'invalid-email' };

      userController.createUser.mockImplementation((req, res) => {
        res.status(400).json({ error: 'Validation failed' });
      });

      const response = await request(app)
        .post('/users')
        .send(userData)
        .expect(400);

      expect(response.body).toEqual({ error: 'Validation failed' });
    });
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      ];

      userController.getAllUsers.mockImplementation((req, res) => {
        res.json(mockUsers);
      });

      const response = await request(app).get('/users').expect(200);

      expect(response.body).toEqual(mockUsers);
      expect(userController.getAllUsers).toHaveBeenCalled();
    });

    it('should handle server errors', async () => {
      userController.getAllUsers.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Internal server error' });
      });

      const response = await request(app).get('/users').expect(500);

      expect(response.body).toEqual({ error: 'Internal server error' });
    });
  });

  describe('GET /users/:id', () => {
    it('should return user by ID', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };

      userController.getUserById.mockImplementation((req, res) => {
        res.json(mockUser);
      });

      const response = await request(app).get('/users/1').expect(200);

      expect(response.body).toEqual(mockUser);
      expect(userController.getUserById).toHaveBeenCalled();
    });

    it('should return 404 for non-existent user', async () => {
      userController.getUserById.mockImplementation((req, res) => {
        res.status(404).json({ error: 'User not found' });
      });

      const response = await request(app).get('/users/999').expect(404);

      expect(response.body).toEqual({ error: 'User not found' });
    });
  });

  describe('PUT /users/:id', () => {
    it('should update user successfully', async () => {
      const userData = {
        name: 'John Updated',
        email: 'john.updated@example.com',
      };
      const mockUser = { id: 1, ...userData };

      userController.updateUser.mockImplementation((req, res) => {
        res.json(mockUser);
      });

      const response = await request(app)
        .put('/users/1')
        .send(userData)
        .expect(200);

      expect(response.body).toEqual(mockUser);
      expect(userController.updateUser).toHaveBeenCalled();
    });

    it('should return 404 for non-existent user', async () => {
      const userData = {
        name: 'John Updated',
        email: 'john.updated@example.com',
      };

      userController.updateUser.mockImplementation((req, res) => {
        res.status(404).json({ error: 'User not found' });
      });

      const response = await request(app)
        .put('/users/999')
        .send(userData)
        .expect(404);

      expect(response.body).toEqual({ error: 'User not found' });
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete user successfully', async () => {
      const result = { message: 'User deleted successfully' };

      userController.deleteUser.mockImplementation((req, res) => {
        res.json(result);
      });

      const response = await request(app).delete('/users/1').expect(200);

      expect(response.body).toEqual(result);
      expect(userController.deleteUser).toHaveBeenCalled();
    });

    it('should return 404 for non-existent user', async () => {
      userController.deleteUser.mockImplementation((req, res) => {
        res.status(404).json({ error: 'User not found' });
      });

      const response = await request(app).delete('/users/999').expect(404);

      expect(response.body).toEqual({ error: 'User not found' });
    });
  });
});
