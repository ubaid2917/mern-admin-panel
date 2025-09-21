'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING,
      fatherName: Sequelize.STRING,
      phone: Sequelize.STRING,
      gender: Sequelize.ENUM("male", "female"),
      dob: Sequelize.DATE,
      bloodGroup: Sequelize.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
      martialStatus: Sequelize.ENUM("married", "single"),
      pic: Sequelize.STRING,
      address: Sequelize.STRING,
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
    await queryInterface.dropTable('patients');
  }
};