'use strict';
const fs = require('fs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seedArticles = require('../articles.json')

    seedArticles.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })

    return queryInterface.bulkInsert('Articles', seedArticles, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles', null, {});
  }
};
