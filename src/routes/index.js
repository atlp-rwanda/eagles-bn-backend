import express from "express"
const router = express.Router()
import User  from "../controllers/user"
import validation from "../middlewares/user"


router.post('/signup', validation.userAuth,User.userSignUp);

export default router;

