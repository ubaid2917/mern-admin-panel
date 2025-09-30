'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('doctors', 'departmentId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'departments', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('doctors', 'departmentId')
  }
};
