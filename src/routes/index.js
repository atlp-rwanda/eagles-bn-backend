import express from 'express';
import userRoutes from './user';
import tripRoutes from './trip';
import auth from '../middlewares/verifyToken';
import accomodationRoutes from './accomodation';
import notification from './notification';
import bookingRoutes from './booking';
import roomRoutes from './room';
import rating from './rating';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/rooms', bookingRoutes);
router.use('/accommodations', rating);
router.use('/notification', notification);
router.use('/trips', auth, tripRoutes);
router.use('/accommodations', accomodationRoutes);
router.use('/accommodation', roomRoutes);

export default router;
