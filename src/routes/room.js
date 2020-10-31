import Router from "express";
import { upload } from '../helpers/file-uploader';
import RoomController from '../controllers/room';
import roomValidation from '../validators/room';
import verifyAccessToken from '../middlewares/verifyToken';

const router = Router();

router.get("/:accommodation/rooms", RoomController.index);
router.get("/:accommodation/rooms/:id", RoomController.show);
router.post("/:accommodation/rooms", verifyAccessToken, upload.any(), roomValidation, RoomController.create);
router.put("/:accommodation/rooms/:id", verifyAccessToken, upload.any(), roomValidation, RoomController.update);
router.delete("/:accommodation/rooms/:id", verifyAccessToken, RoomController.destroy);
export default router;
