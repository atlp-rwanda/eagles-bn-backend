
import express from 'express';
const router=express.Router();
import authRoutes from '../routes/auth';
import userRoutes from '../routes/user';

router.use("/", authRoutes);
router.use("/", userRoutes);


export default router;

