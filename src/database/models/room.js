const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.belongsTo(models.Accommodation, {
        foreignKey: "accommodation_id",
      });
    }
  }
  Room.init({
    price: DataTypes.INTEGER,
    images: DataTypes.ARRAY(DataTypes.STRING),
    accommodation_id: DataTypes.INTEGER,
    details: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Room',
    tableName: 'Rooms'
  });
  return Room;
};
