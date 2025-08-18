const { sequelize } = require('../config/database');
const fs = require('fs');
const path = require('path');

class MigrationRunner {
  constructor() {
    this.migrationsPath = path.join(__dirname, '../migrations');
  }

  async runMigrations() {
    try {
      // Create migrations table if it doesn't exist
      await this.createMigrationsTable();

      // Get all migration files
      const migrationFiles = this.getMigrationFiles();

      // Get executed migrations
      const executedMigrations = await this.getExecutedMigrations();

      // Run pending migrations
      for (const file of migrationFiles) {
        if (!executedMigrations.includes(file)) {
          await this.runMigration(file);
        }
      }

      console.log('✅ All migrations completed successfully');
    } catch (error) {
      console.error('❌ Migration error:', error);
      throw error;
    }
  }

  async createMigrationsTable() {
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS SequelizeMeta (
        name VARCHAR(255) NOT NULL PRIMARY KEY
      );
    `);
  }

  getMigrationFiles() {
    return fs
      .readdirSync(this.migrationsPath)
      .filter((file) => file.endsWith('.js'))
      .sort();
  }

  async getExecutedMigrations() {
    const [results] = await sequelize.query('SELECT name FROM SequelizeMeta');
    return results.map((row) => row.name);
  }

  async runMigration(filename) {
    const migration = require(path.join(this.migrationsPath, filename));

    console.log(`🔄 Running migration: ${filename}`);

    try {
      await migration.up(sequelize.getQueryInterface(), sequelize.Sequelize);

      // Record migration as executed
      await sequelize.query('INSERT INTO SequelizeMeta (name) VALUES (?)', {
        replacements: [filename],
      });

      console.log(`✅ Migration completed: ${filename}`);
    } catch (error) {
      console.error(`❌ Migration failed: ${filename}`, error);
      throw error;
    }
  }

  async rollbackMigration(filename) {
    const migration = require(path.join(this.migrationsPath, filename));

    console.log(`🔄 Rolling back migration: ${filename}`);

    try {
      await migration.down(sequelize.getQueryInterface(), sequelize.Sequelize);

      // Remove migration from executed list
      await sequelize.query('DELETE FROM SequelizeMeta WHERE name = ?', {
        replacements: [filename],
      });

      console.log(`✅ Rollback completed: ${filename}`);
    } catch (error) {
      console.error(`❌ Rollback failed: ${filename}`, error);
      throw error;
    }
  }
}

module.exports = new MigrationRunner();
