/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */
import { io } from '../index';
import userNotification from './notificationHelper';

/* eslint-disable require-jsdoc */
/**
   * send notification in real-time into application.
   * @param {SocketIo} SocketIo after user accessing application.
   * @returns {SocketIo} The user notifications will be displayed automatically.
   */
class SocketIo {
  static socket(receiverId, notification, savedData) {
    const realData = io.sockets.in(receiverId).emit(notification, savedData);
    return realData;
  }

  static async sock(id) {
    const receiver = await userNotification.retrieveOneNotificationById(id)
      .then((userNotifications) => {
        io.emit('fetchNotification', userNotifications);
      }).catch((error) => console.log('fail fetching notification: ', error));
    return receiver;
  }
}

export default SocketIo;
