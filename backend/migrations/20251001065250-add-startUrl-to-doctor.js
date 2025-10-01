'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('doctors', 'startUrl', {
    type: Sequelize.TEXT,
    allowNull: true
   })
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.removeColumn('doctors', 'startUrl')
  }
};
