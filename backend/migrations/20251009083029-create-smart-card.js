
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('smart_card', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      name: Sequelize.STRING,
      minVisits: Sequelize.INTEGER,
      discount: Sequelize.FLOAT,
      type: Sequelize.ENUM("Silver", "Gold", "Platinum", "Diamond", "VIP"),
      validity: Sequelize.INTEGER,
      description: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('smart_card');
  }
};