const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Accommodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Accommodation.belongsTo(models.Location, {
        foreignKey: "location_id",
      });
      Accommodation.hasMany(models.Room, {
        foreignKey: "accommodation_id",
        as: "rooms",
        onDelete: "cascade"
      });
      Accommodation.hasMany(models.Rating, {
        foreignKey: "accommodation_id",
        onDelete: "CASCADE"
      });
      Accommodation.hasMany(models.Trips, {
        foreignKey: "accommodation_id",
        onDelete: "CASCADE"
      });
      Accommodation.hasMany(models.Rating, {
        foreignKey: "accommodation_id",
        onDelete: "CASCADE"
      });
      Accommodation.hasMany(models.Booking, {
        foreignKey: "accommodation_id",
      });
    }
  }
  Accommodation.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    location_id: DataTypes.INTEGER,
    images: DataTypes.ARRAY(DataTypes.STRING),
    lat: DataTypes.STRING,
    long: DataTypes.STRING,
    services: DataTypes.ARRAY(DataTypes.STRING),
    amenities: DataTypes.ARRAY(DataTypes.STRING),
    host_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Accommodation',
    tableName: 'Accommodations',
    freezeTableName: true
  });
  return Accommodation;
};
