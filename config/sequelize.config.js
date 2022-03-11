const dbConfig = require('./db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false},
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
module.exports = { sequelize };
