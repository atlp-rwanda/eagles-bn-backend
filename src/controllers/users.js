import bcrypt from "bcrypt"
import { signToken } from '../helpers';
import db from "../database/models/index"
const User = db.User;
let newUser
export const createUser = async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(req.body.password, salt);
        newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        res.status(200).json(signToken(newUser));
    } catch (err) {
        res.status(500).send({ error: err })
    }

}