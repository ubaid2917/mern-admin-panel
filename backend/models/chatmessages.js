'use strict';
const BaseModel = require('./baseModel');

class ChatMessages extends BaseModel {
  static initModel(sequelize, DataTypes) {
    return super.initBase(
      sequelize,
      {
        senderId: DataTypes.UUID,
        senderId: DataTypes.UUID,
        type: DataTypes.ENUM('text', 'image', 'file'),
        message: DataTypes.TEXT,
        chatId: DataTypes.UUID,
        isRead: DataTypes.BOOLEAN,
      },
      {
        modelName: 'ChatMessages',
        tableName: 'chat_messages',
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted',
        
      },
      {
        defaultScope: {
          where: {
            deleted: null,
          },
        },
      }
    );
  }

  static associate(models) {
    // define association here
  }
}

module.exports = ChatMessages;
