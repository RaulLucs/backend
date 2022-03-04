const Sequelize = require('sequelize');
const { sequelize } = require('../config/sequelize.config');

const Office = sequelize.define('office', {
  office_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  building: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  floor_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  total_desks_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  usable_desks_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  office_administrator: {
    type: Sequelize.STRING,
  },
});

module.exports = { Office };
