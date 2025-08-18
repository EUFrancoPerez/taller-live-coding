const express = require('express');
const cors = require('cors'); // Make frontend and backend communicate
const { sequelize, testConnection } = require('./config/database');
const routes = require('./routes');
const migrationRunner = require('./utils/migrationRunner');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize database
const initializeDatabase = async () => {
  try {
    // Test database connection
    await testConnection();

    // Run migrations
    await migrationRunner.runMigrations();

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
};

// Initialize database and start server
initializeDatabase().then(() => {
  // Mount all routes
  app.use('/api', routes);

  app.listen(PORT, () => {
    console.log(`Servidor backend en http://localhost:${PORT}`);
  });
});
