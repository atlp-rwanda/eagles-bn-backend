import express from "express"
import usersController from '../controllers/index'
const router = express.Router()
router.post('register', usersController.createUser)