const Sequelize = require("sequelize");
const { sequelize } = require("../config/sequelize.config");
const { Office } = require("./office.model");
const { User } = require("./user.model");

const Remote = sequelize.define(
  "remote",
  {
    percentage: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    reason: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 2,
    },
  },
  { tableName: "remote" }
);
User.associate = (models) => {
  User.hasOne(models.user, {
    foreignKey: "id",
    sourceKey: "user_id",
  });
};
Office.associate = (models) => {
  Office.hasOne(models.office, {
    foreignKey: "id",
    sourceKey: "office_administrator",
  });
};

module.exports = { Remote };
