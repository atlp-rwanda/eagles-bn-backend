/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import Models from '../database/models';

const {
  User, Notification, Trips, Comment
} = Models;

class NotificationHelpers {
  // Finds the user's details from user table in database.
  static async userDetails(userId) {
    const userData = await User.findOne({ where: { id: userId } });
    return userData;
  }
  // retrieve Trip from Trip table in the DB.

  static async retrieveTrip(tripId) {
    const findTrip = await Trips.findOne({
      where: { id: tripId },
      include: [
        {
          model: User,
          as: 'requester',
          attributes: ['id', 'first_name', 'last_name', 'email']
        },
        {
          model: User,
          as: 'managers',
          attributes: ['id', 'first_name', 'last_name', 'email']
        },
        {
          model: Comment,
          as: 'Comments',
          attributes: ['id', 'comment', 'createdAt']
        }
      ]
    });
    return findTrip;
  }

  // insert notification into Notification table in the DB.
  static async insertNotification(trip, receiver, description) {
    const createdNotification = await Notification.create({
      tripId: trip,
      receiver,
      description,
      is_read: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const notification = await createdNotification.save();
    return notification;
  }

  // Finds the receiver's details from notification table in the DB.
  static async retrieveOneNotificationById(argument) {
    const userNotification = await Notification.findAll({ where: { receiver: argument } }).then((userNotify) => userNotify);
    return userNotification;
  }

  // Finds a users.
  static async findAllUsers(skip, start) {
    const foundUsers = await User.findAndCountAll({
      limit: skip,
      offset: start,
      attributes: ['id', 'first_name', 'last_name', 'email', 'role', 'manager']
    });
    return foundUsers;
  }

  // Finds a managers.
  static async findAllManagers(skip, start) {
    const foundManagers = await User.findAndCountAll({
      where: { role: 'MANAGER' },
      limit: skip,
      offset: start,
      attributes: ['id', 'first_name', 'last_name', 'email', 'role', 'manager']
    });
    return foundManagers;
  }
}
export default NotificationHelpers;
