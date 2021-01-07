import emitter from '../../utils/EventEmitters';

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    tripId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "Comment",
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Trips, {
      foreignKey: "tripId",
      as: 'Trips'
    });
  };

  Comment.afterCreate(({ dataValues }) => emitter.emit('comment added', dataValues));

  return Comment;
};
