/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */
import express from 'express';
import Notifications from '../controllers/notification';
import Unread from '../middlewares/notification';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

// get all notification
router.get('/all', verifyToken, Notifications.getAllNotifications);

// change the way you recieve notification
router.patch('/preferences', verifyToken, Notifications.changeMethod);

// get unread notification
router.get('/unread', verifyToken, Notifications.unReadNotifications);

// mark all notifications as read

router.put('/readall', verifyToken, Unread, Notifications.markAllNotificationAsRead);
export default router;
