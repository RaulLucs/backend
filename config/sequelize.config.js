const dbConfig = require('./db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,
  ssl: true,
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized:false,
    }
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
module.exports = { sequelize };
