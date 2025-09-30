'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('doctors', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"), 
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
      },
      qualification: {
        type: Sequelize.STRING,
      },
      dob: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM("male", "female"),
      },
      appointmentCharges: {
        type: Sequelize.INTEGER,
      },
      created: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deleted: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('doctors');
  }
};