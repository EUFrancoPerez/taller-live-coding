# Testing Guide

This project uses Jest for testing with a comprehensive test suite covering all layers of the application.

## 🧪 Test Structure

```
backend/
├── test/
│   ├── setup.js                    # Jest setup configuration
│   ├── services/
│   │   └── userService.test.js     # Service layer tests
│   ├── controllers/
│   │   └── userController.test.js  # Controller layer tests
│   ├── integration/
│   │   └── userRoutes.test.js      # API integration tests
│   └── utils/
│       └── migrationRunner.test.js # Utility tests
├── jest.config.js                  # Jest configuration
└── TESTING.md                      # This file
```

## 🚀 Test Commands

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run Tests Verbosely

```bash
npm run test:verbose
```

## 📊 Test Coverage

The test suite covers:

- **Services** - Business logic layer
- **Controllers** - HTTP request/response handling
- **Routes** - API endpoint integration
- **Utilities** - Helper functions and utilities

## 🎯 Test Types

### 1. Unit Tests

- **Services**: Test business logic in isolation
- **Controllers**: Test request/response handling
- **Utilities**: Test helper functions

### 2. Integration Tests

- **Routes**: Test API endpoints with mocked dependencies
- **Database**: Test database operations (when needed)

### 3. Mock Strategy

- **Models**: Mocked to avoid database dependencies
- **External Services**: Mocked to ensure test isolation
- **HTTP Requests**: Mocked using Jest mocks

## 🔧 Test Configuration

### Jest Configuration (`jest.config.js`)

```javascript
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: [
    'controllers/**/*.js',
    'services/**/*.js',
    'models/**/*.js',
    'utils/**/*.js',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  testTimeout: 10000,
};
```

### Test Setup (`test/setup.js`)

- Environment configuration
- Console mocking
- Global test setup

## 📝 Writing Tests

### Service Test Example

```javascript
describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user successfully', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    const mockUser = { id: 1, ...userData };

    User.create.mockResolvedValue(mockUser);

    const result = await userService.createUser(userData);

    expect(User.create).toHaveBeenCalledWith(userData);
    expect(result).toEqual(mockUser);
  });
});
```

### Controller Test Example

```javascript
describe('UserController', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { body: {}, params: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('should create a user successfully', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    mockReq.body = userData;

    await userController.createUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalled();
  });
});
```

### Integration Test Example

```javascript
describe('User Routes Integration', () => {
  it('should create a user successfully', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };

    const response = await request(app)
      .post('/users')
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(userData.name);
  });
});
```

## 🎨 Best Practices

### 1. Test Organization

- Group related tests using `describe` blocks
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

### 2. Mocking

- Mock external dependencies
- Use `jest.clearAllMocks()` in `beforeEach`
- Mock at the right level (service vs model)

### 3. Assertions

- Test both success and error cases
- Verify function calls and return values
- Test edge cases and error conditions

### 4. Test Data

- Use realistic test data
- Create helper functions for common test data
- Keep tests independent

## 🔍 Debugging Tests

### Run Specific Test File

```bash
npm test -- userService.test.js
```

### Run Tests with Console Output

```bash
npm test -- --verbose
```

### Debug Failing Tests

```bash
npm test -- --detectOpenHandles
```

## 📈 Coverage Goals

- **Statements**: > 90%
- **Branches**: > 85%
- **Functions**: > 90%
- **Lines**: > 90%

## 🚨 Common Issues

### 1. Async/Await

- Always use `async/await` or return promises
- Use `done` callback for callbacks

### 2. Mock Cleanup

- Clear mocks between tests
- Reset mock implementations

### 3. Database Tests

- Use test database
- Clean up data after tests
- Mock database calls for unit tests
