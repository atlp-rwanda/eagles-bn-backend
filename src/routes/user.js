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
/* eslint-disable linebreak-style */ router.put(
  '/email-verification/:token',
  userValidation.verifyToken,
  User.emailVerification
);
router.post("/login", User.login);
router.post("/forgetPassword", User.forgetPassword);
router.post("/logout", verifyAccessToken, User.logout);
router.put("/resetPassword/:token/:email", User.resetPassword);
router.get("/test-auth", verifyAccessToken, (req, res) => res.sendStatus(200));
router.put('/roles/:id', verifyAccessToken, userValidation.isSuperAdmin(roles.SUPER_ADMIN), User.changeRoles);
router.post('/signup', userValidation.signUpValidation, User.userSignUp);
router.patch('/profile', verifyAccessToken, userValidation.profileValidate, User.userProfile);
router.put('/remember-travel', verifyAccessToken, catcher(User.RememberTravel));
export default router;
