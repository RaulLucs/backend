const Sequelize = require('sequelize');
const { sequelize } = require('../config/sequelize.config');

const Building = sequelize.define('building', {
  building_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  floors_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  building_address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = { Building };
