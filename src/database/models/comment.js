const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    static associate(models) {
      comment.belongsTo(models.Trips, {
        foreignKey: "tripId",
      });
    }
  }
  comment.init(
    {
      userId: DataTypes.INTEGER,
      tripId: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return comment;
};
