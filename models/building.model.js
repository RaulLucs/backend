const { client_encoding } = require('pg/lib/defaults');
const Sequelize = require('sequelize');
const { sequelize } = require('../config/sequelize.config');

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
Building.associate = (models) => {
  console.log(models);
  Building.belongsTo(models.office, {
    foreignKey: 'building_id',
  });
};

module.exports = { Building };
