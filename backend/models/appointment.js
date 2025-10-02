"use strict";
const { DataTypes } = require("sequelize");
const BaseModel = require("./baseModel");

class Appointment extends BaseModel {
  static initModel(sequelize) {
    return super.initBase(
      sequelize,
      {
        patientId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        doctorId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        fees: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        priority: {
          type: DataTypes.ENUM("normal", "urgent"),
          allowNull: true,
          defaultValue: "normal",
        },
        payment: {
          type: DataTypes.ENUM("cash", "check", "online"),
          allowNull: false,
          defaultValue: "cash",
        },
        isLiveConsult: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      
        meetingId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        meetingUrl: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        startUrl: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        meetingPassword: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        modelName: "Appointment",
        tableName: "appointments",
        defaultScope: {
          where: {
            deleted: null,
          },
        },
      }
    );
  }

  static associate(models) {
    // relationship here
  }
}

module.exports = Appointment;
