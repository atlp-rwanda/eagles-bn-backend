/* eslint-disable linebreak-style */
import { onError } from '../utils/response';
import { Notification } from '../database/models';

const Unread = async (req, res, next) => {
  const { id } = req.user;
  const unread = await Notification.findAll({ where: { receiver: id, is_read: false } });

  if (unread.length === 0) {
    return onError(res, 404, 'You have zero unread notification');
  }

  next();
};

export default Unread;
