const Sequelize = require('sequelize');
const { sequelize } = require('../config/sequelize.config');
const { Building } = require('./building.model');

const Office = sequelize.define(
  'office',
  {
    office_name: {
      type: Sequelize.STRING,
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
      type: Sequelize.INTEGER,
    },
    building_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'building',
        key: 'id',
      },
    },
  },
  { tableName: 'office' }
);

Office.associate = (models) => {
  Office.hasOne(models.building, {
    foreignKey: 'id',
    sourceKey: 'building_id',
  });
};

module.exports = { Office };
