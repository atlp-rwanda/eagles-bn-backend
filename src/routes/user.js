/* eslint-disable linebreak-style */
import Router from 'express';
import authRoutes from './oauth';
import User from '../controllers/user';
import verifyAccessToken from '../middlewares/verifyToken';
import { roles } from '../helpers/roles';
import userValidation from '../validators/user';
import catcher from '../utils/catcher';

const router = Router();

router.use('/', authRoutes);
router.put('/email-verification/:token', userValidation.verifyToken, catcher(User.emailVerification));
router.post("/login", catcher(User.login));
router.post("/forgetPassword", User.forgetPassword);
router.post("/logout", verifyAccessToken, catcher(User.logout));
router.put("/resetPassword/:token/:email", User.resetPassword);
router.put('/roles/:id', verifyAccessToken, userValidation.IsAllowed(roles.SUPER_ADMIN), catcher(User.changeRoles));
router.post('/signup', userValidation.signUpValidation, User.userSignUp);
router.patch('/profile', verifyAccessToken, userValidation.profileValidate, User.userProfile);
router.put('/remember-travel', verifyAccessToken, catcher(User.RememberTravel));

export default router;
