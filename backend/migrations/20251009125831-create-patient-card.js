'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('patient_card', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      cardId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      patientId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      isExpired: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      expiredAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      discount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      created: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deleted: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('patient_card');
  }
};