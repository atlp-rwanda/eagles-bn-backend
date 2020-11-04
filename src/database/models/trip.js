const { Model } = require("sequelize");

const generateTripProperties = (DataTypes) => ({
  requester_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  manager_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  trip_type: DataTypes.STRING,
  from: DataTypes.INTEGER,
  to: DataTypes.ARRAY(DataTypes.INTEGER),
  departure_date: DataTypes.DATE,
  return_date: DataTypes.DATE,
  reasons: DataTypes.TEXT,
  accommodation_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    static associate(models) {
      // models.User.hasOne(models.Trip, { as: "requester_id" });
      models.Trip.belongsTo(models.User, {
        as: "requester",
        foreignKey: "requester_id",
      });
      models.Trip.belongsTo(models.User, {
        as: "manager",
        foreignKey: "manager_id",
      });
      // models.Trip.belongsTo(models.Location, {
      //   as: "from",
      //   foreignKey: "from",
      // });
      // models.Trip.belongsToMany(models.Location, {
      //   as: "to",
      //   through: "to",
      // });
    }
  }
  Trip.init(generateTripProperties(DataTypes), {
    sequelize,
    modelName: "Trip",
  });
  return Trip;
};
