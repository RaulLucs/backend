const Sequelize = require('sequelize');
const { sequelize } = require('../config/sequelize.config');

const Building = sequelize.define('building', {
  building_name: {
    type: Sequelize.STRING,
  },
  floors_count: {
    type: Sequelize.INTEGER,
  },
  building_address: {
    type: Sequelize.STRING,
  },
});

module.exports = { Building };
