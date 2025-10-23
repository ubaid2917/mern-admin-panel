'use strict';
const BaseModel = require('./baseModel'); 
const { DataTypes } = require('sequelize');


class Chat extends BaseModel {
  static initModel(sequelize) {
    return super.initBase(
      sequelize,
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
      created: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deleted: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
      {
        modelName: 'Chat',
        tableName: 'chat',
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

module.exports = Chat;
