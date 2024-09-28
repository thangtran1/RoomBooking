"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Post.belongsTo(models.Image, { foreignKey: "imagesId", as: "images" });
      Post.belongsTo(models.Attribute, {
        foreignKey: "attributesId",
        as: "attributes",
      });
      Post.belongsTo(models.Price, {
        foreignKey: "priceCode",
        targetKey: "code",
        as: "price",
      });
      Post.belongsTo(models.Area, {
        foreignKey: "areaCode",
        targetKey: "code",
        as: "area",
      });
      Post.belongsTo(models.Category, {
        foreignKey: "categoryCode",
        targetKey: "code",
        as: "category",
      });
      Post.belongsTo(models.Province, {
        foreignKey: "provinceCode",
        targetKey: "code",
        as: "province",
      });
      Post.belongsTo(models.Overview, {
        foreignKey: "overviewId",
        as: "overview",
      });
      Post.belongsTo(models.Label, {
        foreignKey: "labelCode",
        as: "labelData",
      });
      Post.hasMany(models.Favorite, { foreignKey: "postId", as: "favorites" });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      star: DataTypes.STRING,
      labelCode: DataTypes.STRING,
      address: DataTypes.STRING,
      attributesId: DataTypes.STRING,
      categoryCode: DataTypes.STRING,
      priceCode: DataTypes.STRING,
      areaCode: DataTypes.STRING,
      provinceCode: DataTypes.STRING,
      description: DataTypes.TEXT,
      userId: DataTypes.STRING,
      overviewId: DataTypes.STRING,
      imagesId: DataTypes.STRING,
      priceNumber: DataTypes.FLOAT,
      areaNumber: DataTypes.FLOAT,
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      likeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
