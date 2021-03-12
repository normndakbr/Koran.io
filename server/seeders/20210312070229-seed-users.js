'use strict';

const fs = require('fs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seedUsers = require('../users.json')

    seedUsers.forEach(el => {
      el.createdAt = new Date(),
      el.updatedAt = new Date()
    })

    return queryInterface.bulkInsert('Users', seedUsers, {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
