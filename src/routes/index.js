<<<<<<< HEAD
<<<<<<< HEAD
import express from "express"
import usersController from '../controllers/index'
const router = express.Router()
router.post('register', usersController.createUser)
=======
import {Router} from "express"
=======
import Router from "express"
>>>>>>> conflict persisting
const router=Router();
import User  from "../controllers/user"

router.post('/signup', User.userSignUp);

export default router;
>>>>>>> feat(user-signup): create user
