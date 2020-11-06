import Router from "express";
import AccomodationController from '../controllers/accomodation';
import { upload } from '../helpers/file-uploader';
import accommodationValidator from '../middlewares/accommodation';
import verifyAccessToken from '../middlewares/verifyToken';

const router = Router();

router.get("/", AccomodationController.index);
router.get("/:id", AccomodationController.show);
router.post("/", verifyAccessToken, upload.any(), accommodationValidator, AccomodationController.create);
router.put("/:id", verifyAccessToken, upload.any(), accommodationValidator, AccomodationController.update);
router.delete("/:id", verifyAccessToken, AccomodationController.destroy);
export default router;
