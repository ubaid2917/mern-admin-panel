'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'role', {
      type: Sequelize.ENUM('user', 'admin', 'doctor', 'patient'),
      allowNull: false,
      defaultValue: 'user', // optional, default role
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user', 'role');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_role";'); // ENUM type cleanup
  },
};
