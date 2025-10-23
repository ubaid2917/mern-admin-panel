"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chat.init(
    {
      firstParticipant: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      secondParticipant: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      lastMessage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Chat",
      tableName: "chat",
      createdAt: "created",
      updatedAt: "updated",
      deletedAt: "deleted",
      defaultScope: {
        where: {
          deleted: null,
        },
      },
    }
  );
  return Chat;
};
