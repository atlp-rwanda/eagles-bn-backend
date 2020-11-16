/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */
import models from '../database/models';

export async function createChat(user, message) {
  await models.Chat.create({ userId: user.payload.id, message });
}

export async function getTheChats() {
  models.Chat.belongsTo(models.User, { foreignKey: 'userId' });
  return models.Chat.findAll({
    include: [models.User],
  });
}

export default (io) => {
  io.on('connection', (socket) => {
    socket.on('msg', (data) => {
      const { user } = socket.request;
      console.log(user);
      createChat(user, data.message);
      io.sockets.emit('newmsg', {
        username: user.payload.first_name,
        message: data.message,
        date: new Date(),
      });
    });

    getTheChats()
      .then((chats) => {
        chats.map((chat) =>
          socket.emit('newmsg', {
            username: chat.first_name,
            message: chat.message,
            date: chat.createdAt,
          })
        );
      })
      .catch((err) => {
        console.error("Sorry, you Can't get the Chats!");
        console.error(err);
      });
  });
};
