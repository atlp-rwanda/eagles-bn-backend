/* eslint-disable linebreak-style */
import Router from "express";
import User from "../controllers/user";
import user from "../middlewares/user";
import verifyAccessToken from '../middlewares/verifyToken';

const router = Router();

router.post("/signup", user.validate, User.userSignUp);
router.put(
  "/email-verification/:token",
  user.verifyToken,
  User.emailVerification
);
router.post('/logout', verifyAccessToken, User.logout);

export default router;
