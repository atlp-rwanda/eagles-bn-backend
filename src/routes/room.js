import Router from "express";
import { upload } from '../helpers/file-uploader';
import RoomController from '../controllers/room';
import roomValidation from '../validators/room';
import verifyAccessToken from '../middlewares/verifyToken';
import user from '../validators/user';
import { roles } from '../helpers/roles';

const router = Router();

router.get("/:accommodation/rooms", RoomController.index);
router.get("/:accommodation/rooms/:id", RoomController.show);
router.post("/:accommodation/rooms", verifyAccessToken, user.IsAllowed(roles.ADMIN), roomValidation, RoomController.create);
router.put("/:accommodation/rooms/:id", verifyAccessToken, user.IsAllowed(roles.ADMIN), roomValidation, RoomController.update);
router.delete("/:accommodation/rooms/:id", verifyAccessToken, user.IsAllowed(roles.ADMIN), RoomController.destroy);

export default router;
