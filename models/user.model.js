const Sequelize = require('sequelize');
const { sequelize } = require('../config/sequelize.config');
const { Office } = require('./office.model');
const User = sequelize.define(
  'user',
  {
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email_address: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: 'compositeIndex',
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.INTEGER,
      defaultValue: 2,
    },
    gender: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    date_of_birth: {
      type: Sequelize.STRING,
    },
    nationality: {
      type: Sequelize.STRING,
    },
    active_user: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },
  { tableName: 'user' }
);

Office.hasMany(User, { as: 'users' });
User.belongsTo(Office, {
  foreignKey: 'office_id',
  as: 'office',
});

module.exports = { User };
