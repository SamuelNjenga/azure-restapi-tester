"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: {
          name: "roleId",
          allowNull: false,
        },
      });
    }
  }
  User.init(
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "RESTRICT",
        references: { model: "roles", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
