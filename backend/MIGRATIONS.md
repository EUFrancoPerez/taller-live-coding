# Database Migrations

This project uses a custom migration system to manage database schema changes.

## 📁 Structure

```
backend/
├── migrations/
│   └── 001-create-users-table.js    # Migration files
├── utils/
│   └── migrationRunner.js           # Migration runner utility
├── scripts/
│   ├── runMigrations.js             # Run migrations script
│   └── migrationStatus.js           # Check migration status
└── MIGRATIONS.md                    # This file
```

## 🚀 Commands

### Run Migrations

```bash
npm run migrate
```

### Check Migration Status

```bash
npm run migrate:status
```

### Start Development Server (includes migrations)

```bash
npm run dev
```

## 📝 Creating New Migrations

1. Create a new file in the `migrations/` folder with the format: `XXX-description.js`
2. Use the following template:

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Migration logic here
    await queryInterface.createTable('table_name', {
      // table definition
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback logic here
    await queryInterface.dropTable('table_name');
  },
};
```

## 🔄 Migration Flow

1. **Automatic**: Migrations run automatically when starting the server
2. **Manual**: Use `npm run migrate` to run migrations manually
3. **Status**: Use `npm run migrate:status` to check which migrations have been executed

## 📊 Migration Tracking

Migrations are tracked in the `SequelizeMeta` table in your database, which stores:

- `name`: The filename of the executed migration

## ⚠️ Important Notes

- Migrations run in alphabetical order based on filename
- Always include both `up` and `down` methods
- Test migrations in development before running in production
- Never modify existing migration files that have been executed in production
