import { Router } from 'express';
import Notifications from '../controllers/notification';
import verifyToken from '../middlewares/verifyToken';
import catcher from '../utils/catcher';

const router = Router();

router.get('/', verifyToken, catcher(Notifications.getNotifications));
router.patch('/read', verifyToken, catcher(Notifications.markAsRead));
router.patch('/readall', verifyToken, catcher(Notifications.markAsRead));

export default router;
