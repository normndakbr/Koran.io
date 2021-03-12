'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserArticle extends Model {
    
    static associate(models) {
      UserArticle.belongsTo(models.User, {foreignKey: 'UserId'})
      UserArticle.belongsTo(models.Article, {foreignKey: 'ArticleId'})
    }
  };
  UserArticle.init({
    UserId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ArticleId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'UserArticle',
  });
  return UserArticle;
};