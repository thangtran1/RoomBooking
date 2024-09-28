"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Favorite.belongsTo(models.Post, { foreignKey: "postId", as: "post" });
    }
  }

  Favorite.init(
    {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      postId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Favorite",
    }
  );

  return Favorite;
};
