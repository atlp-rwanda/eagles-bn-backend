/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */
import dotenv from 'dotenv';
import userToNotifY from './socket';

dotenv.config();

const socketHelper = (io) => {
  io.on('connection', (socket) => {
    socket.on('realReceipt', (data) => {
      socket.join(data);
      userToNotifY.sock(data);
    });
  });
};
export default socketHelper;
