/* eslint-disable linebreak-style */
import Router from "express";
import RoomController from '../controllers/room';
import roomValidation from '../validators/room';
import verifyAccessToken from '../middlewares/verifyToken';
import user from '../validators/user';
import { roles } from '../helpers/roles';

const router = Router();

router.get("/:accommodation/rooms", RoomController.index);
router.get("/:accommodation/rooms/:id", RoomController.show);
router.post("/:accommodation/rooms", verifyAccessToken, user.IsAllowed(roles.MANAGER), roomValidation, RoomController.create);
router.put("/:accommodation/rooms/:id", verifyAccessToken, user.IsAllowed(roles.MANAGER), roomValidation, RoomController.update);
router.delete("/:accommodation/rooms/:id", verifyAccessToken, user.IsAllowed(roles.MANAGER), RoomController.destroy);
export default router;
