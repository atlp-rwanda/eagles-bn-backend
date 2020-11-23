/* eslint-disable import/no-cycle */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import tripNotification from '../helpers/sendEmail';
import Models from '../database/models';
import { onError, onSuccess } from '../utils/response';
import socketIo from "../helpers/socket";
import importQuery from '../helpers/notificationHelper';

const { User, Notification } = Models;

class Notifications {
/**
   * This function will be holding three value which will be passed as paramenters.
   * @param {string} trip The Trip.
   * @param {string} action The status of request.
   * @param {string} res This will display error when something is happened.
   * @returns {string} return user who created rquest.
   */
  static async sendNotification(trip, action, res) {
    const retrievedTrip = await importQuery.retrieveTrip(trip);
    const requester = await importQuery.userDetails(retrievedTrip.requester_id);
    const manager = await User.findOne({ where: { manager: requester.manager } });
    const url = `${process.env.BASE_URL}/api/trips/${retrievedTrip.id}/`;
    const status = `REQUEST ${action}`;
    const appNotification = `<span style='color: #7FD8A7 ;'>${status}</span> <br> 
      <span style='color: #614e1f;'> Hello, you have new notification for travel which is ${action} for more details
       click the link <span style='color: #044F72;'><a href=${url}>${retrievedTrip.trip_type}  Request</a> </span> </span><br><br>`;
    const emailNotification = `<span style='color: #7FD8A7 ;'>${status}</span> <br> 
      <span style='color: #614e1f;'> Hello, You have new notification for travel request which is <span style='color: #7FD8A7 ;'> ${action} </span> </span>`;
    const actions = ['Pending', 'Edited', 'Commented by requester', 'rejected', 'approved', 'Commented by manager'];
    if (!(actions.includes(action))) {
      return onError(res, 400, 'Unknown Action');
    }

    if (action === 'Commented by manager' || action === 'approved' || action === 'rejected') {
      socketIo.socket(requester.id, 'notification', appNotification);
      await importQuery.insertNotification(retrievedTrip.id, requester.id, appNotification);
      await tripNotification(requester.email, requester.first_name, url, emailNotification);
    } else {
      socketIo.socket(manager.id, 'notification', appNotification);
      await importQuery.insertNotification(trip, manager.id, appNotification);
      await tripNotification(manager.email, manager.first_name, url, emailNotification);
    }
  }

  // Disable/enable In-App/Email notifications

  static async changeMethod(req, res) {
    try {
      const {
          body: {
            notifyByEmail
          },
          user: {
            email,
          }
        } = req,
        byEmail = notifyByEmail.toLowerCase() === 'false';
      await User.update({
        notifyByEmail: byEmail,
      }, { where: { email } });
      return onSuccess(res, 200, 'Notification method changed Successfully');
    } catch (error) {
      return onError(res, 500, 'Internal server error');
    }
  }

  // view all notification
  static async getAllNotifications(req, res) {
    try {
      const { id } = req.user;
      const notifications = await Notification.findAll({
        where: {
          receiver: id
        },
      });

      if (notifications.length === 0 || notifications.length === undefined) {
        return onError(res, 404, 'You do not have a notification');
      }
      return onSuccess(res, 200, 'Notification fetched successfully', notifications);
    } catch (error) {
      return onError(res, 500, 'Internal server error');
    }
  }

  // View all unread notifications
  static async unReadNotifications(req, res) {
    try {
      const { id } = req.user,
        unRead = await Notification.findAll({
          where: {
            receiver: id,
            is_read: false,
          },
        });
      if (unRead.length === 0 || unRead.length === undefined) {
        return onError(res, 404, 'There is no new notification you have!');
      }
      return onSuccess(res, 200, 'Unread notification fetched successfully!', unRead);
    } catch (error) {
      return onError(res, 500, 'Internal server error');
    }
  }

  // mark all notifications as read
  static async markAllNotificationAsRead(req, res) {
    try {
      const { id } = req.user;

      await Notification.update({
        is_read: true
      }, { where: { receiver: id } });

      return onSuccess(res, 200, 'All notificatons marked as read successfully!');
    } catch (error) {
      return onError(res, 500, 'Internal Server Error');
    }
  }
}
export default Notifications;
