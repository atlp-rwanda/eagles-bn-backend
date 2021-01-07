import { onSuccess } from '../utils/response';
import notificationService from '../services/notificationServices';

class Notifications {
  static async getNotifications(req, res) {
    const { id } = req.user;
    const data = await notificationService.getNotifications({ receiver_id: id });
    return onSuccess(
      res,
      200,
      'Your Notifications have been retrieved successfully',
      data
    );
  }

  static async markAsRead(req, res) {
    const param = req.query.id ? { id: req.query.id } : { receiver_id: req.user.id };
    const data = await notificationService.markAsRead({ ...param, is_read: false });
    let message = data > 1 ? 'Notifications' : 'Notification';
    message += ' successfully marked as read';
    if (data[0] === 0) message = 'No Notifications was marked as read';
    return onSuccess(res, 200, message, `${data} marked as read`);
  }
}

export default Notifications;
