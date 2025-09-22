const { Model, DataTypes, Sequelize } = require("sequelize");

class BaseModel extends Model {
  static initBase(sequelize, attributes, options = {}) {
    return super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          defaultValue: Sequelize.literal("gen_random_uuid()"),
          allowNull: false,
          primaryKey: true,
        },
        ...attributes,
        created: {
          type: DataTypes.DATE,
          allowNull: false,
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
        sequelize,
        ...options,
        timestamps: false, 
      }
    );
  }
}

module.exports = BaseModel;
