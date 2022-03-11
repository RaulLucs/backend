const dbConfig = require('./db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, process.env.DATABASE_URL);
module.exports = { sequelize };
