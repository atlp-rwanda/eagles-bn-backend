import { Notification, User } from '../database/models';

class NotificationService {
  static async getNotifications(param) {
    const results = await Notification.findAll({
      where: { ...param, is_read: false },
      include: [{ model: User, as: 'creator', attributes: ['first_name', 'last_name', 'profile_image'] }],
      order: [['createdAt', 'DESC']],
    });

    return {
      unread: results.length,
      notifications: results,
    };
  }

  static async create(notification) {
    const results = await Notification.create(notification);
    return results;
  }

  static async markAsRead(param) {
    const deleted = await Notification.update(
      { is_read: true },
      {
        where: param,
      }
    );
    return deleted;
  }
}

export default NotificationService;
