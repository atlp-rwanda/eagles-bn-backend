const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      // define association here
      Rating.belongsTo(models.Accommodation, {
        foreignKey: "accommodation_id",
        onDelete: "CASCADE"
      });
      Rating.belongsTo(models.Trips,
        {
          foreignKey: "trip_id",
          onDelete: "CASCADE"
        });
    }
  }
  Rating.init({
    accommodation_id: DataTypes.INTEGER,
    trip_id: DataTypes.INTEGER,
    service_rate: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Rating',
    tableName: 'Ratings',
    underscored: true,
  });
  return Rating;
};
