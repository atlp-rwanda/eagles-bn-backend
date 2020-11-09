import Router from "express";
import AccomodationController from '../controllers/accomodation';
import { upload } from '../helpers/file-uploader';
import accommodationValidator from '../middlewares/accommodation';
import verifyAccessToken from '../middlewares/verifyToken';
import user from '../validators/user';
import { roles } from '../helpers/roles';

const router = Router();

router.get("/", AccomodationController.index);
router.get("/:id", AccomodationController.show);
router.post("/", verifyAccessToken, user.IsAllowed(roles.ADMIN), accommodationValidator, AccomodationController.create);
router.put("/:id", verifyAccessToken, user.IsAllowed(roles.ADMIN), accommodationValidator, AccomodationController.update);
router.delete("/:id", verifyAccessToken, user.IsAllowed(roles.ADMIN), AccomodationController.destroy);
export default router;
