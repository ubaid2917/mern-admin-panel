'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('doctors', 'liveUrl', 'meetingUrl');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('doctors', 'meetingUrl', 'liveUrl');
  }
};
