'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },
      patientId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      doctorId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      fees: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      priority: {
        type: Sequelize.ENUM("normal", "urgent"),
        allowNull: true,
        defaultValue: "normal",
      },
      payment: {
        type: Sequelize.ENUM("cash", "check", "online"),
        allowNull: false,
        defaultValue: "cash",
      },
      isLiveConsult: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      meetingId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      meetingUrl: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      startUrl: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      meetingPassword: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('appointments');
  }
};
