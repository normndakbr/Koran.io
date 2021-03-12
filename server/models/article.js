'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {

    static associate(models) {
      Article.belongsToMany(models.User, { through: 'UserArticles', foreignKey: 'ArticleId'})
    }
  };
  Article.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: "Title is required!"
        }
      }
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: "Article body is required!"
        }
      }
    },
    publish_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    page_view: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          message: "Article body is required!"
        }
      }

    }
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};