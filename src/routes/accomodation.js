import Router from 'express';
import AccomodationController from '../controllers/accomodation';
import accommodationValidator from '../middlewares/accommodation';
import feedbackValidation from "../validators/feedback"
import verifyAccessToken from '../middlewares/verifyToken';
import user from '../validators/user';
import { roles } from '../helpers/roles';
import catcher from '../utils/catcher';

const router = Router();

router.get('/', catcher(AccomodationController.index));
router.get('/:id', catcher(AccomodationController.show));
router.post(
  '/',
  verifyAccessToken,
  user.IsAllowed(roles.ADMIN),
  accommodationValidator,
  catcher(AccomodationController.create)
);
router.put(
  '/:id',
  verifyAccessToken,
  user.IsAllowed(roles.ADMIN),
  accommodationValidator,
  catcher(AccomodationController.update)
);
router.delete(
  '/:id',
  verifyAccessToken,
  user.IsAllowed(roles.ADMIN),
  catcher(AccomodationController.destroy)
);
router.post("/:id/like", verifyAccessToken, AccomodationController.like);
router.post("/:id/feedback", verifyAccessToken,feedbackValidation,AccomodationController.feedback);

export default router;
