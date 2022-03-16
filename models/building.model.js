const Sequelize = require('sequelize');
const { sequelize } = require('../config/sequelize.config');
const { Office } = require('./office.model');

const Building = sequelize.define(
  'building',
  {
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
  },
  { tableName: 'building' }
);

Building.hasMany(Office, { as: 'offices' });
Office.belongsTo(Building, {
  foreignKey: 'building_id',
  as: 'building',
});

module.exports = { Building };
