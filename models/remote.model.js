const Sequelize = require('sequelize');
const { sequelize } = require('../config/sequelize.config');
const { User } = require('./user.model');

const Remote = sequelize.define(
  'remote',
  {
    percentage: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    reason: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 2,
    },
  },
  { tableName: 'remote' }
);

User.hasOne(Remote, { as: 'remote' });
Remote.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

module.exports = { Remote };
