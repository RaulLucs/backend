const dbConfig = require('./db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.connectionString,{
  ssl: {
  rejectUnauthorized: false
}});
module.exports = { sequelize };
