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
router.post("/login", User.login);
router.post("/forgetPassword", User.forgetPassword);
router.get("/current", verifyAccessToken, catcher(User.current));
router.post("/logout", verifyAccessToken, catcher(User.logout));
router.put("/resetPassword/:token/:email", catcher(User.resetPassword));
router.get("/test-auth", verifyAccessToken, (req, res) => res.sendStatus(200));
router.put('/email-verification/:token', userValidation.verifyToken, catcher(User.emailVerification));
router.put('/roles/:id', verifyAccessToken, userValidation.IsAllowed(roles.SUPER_ADMIN), catcher(User.changeRoles));
router.patch('/profile', verifyAccessToken, userValidation.profileValidate, catcher(User.userProfile));
router.patch('/profile/picture', verifyAccessToken, catcher(User.profilePicture));
router.put('/remember-travel', verifyAccessToken, catcher(User.RememberTravel));
router.post('/signup', userValidation.signUpValidation, User.userSignUp);
router.get('/profile', verifyAccessToken, catcher(User.getProfile));

export default router;
