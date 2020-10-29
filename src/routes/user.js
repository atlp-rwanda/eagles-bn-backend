
import Router from "express"
const router=Router();
import User  from "../controllers/user"
import validation from "../middlewares/user"


router.post('/signup', validation.userAuth, User.userSignUp);
router.put('/user/email-verification/:token', validation.verifyToken, User.emailVerification);

export default router;