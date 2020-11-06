/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Accommodations.init(sequelize, DataTypes);
}

class Accommodations extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    lat: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    long: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    services: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    amenities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    host_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Accommodations',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Accommodations_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Accommodations;
  }
}
