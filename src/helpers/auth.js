/* eslint-disable linebreak-style */
import { config } from 'dotenv';
import { sign, verify } from 'jsonwebtoken';
import { genSalt, hash } from 'bcryptjs';
import user from '../database/models/user';
import User from '../validators/user';


config();
const { ACCESS_TOKEN_SECRET } = process.env;

export const signToken = (
  { name, email, id: userId },
  secret = ACCESS_TOKEN_SECRET,
  duration = null
) => {
  const tokenOptions = duration ? { expiresIn: duration } : undefined;
  const token = sign({ name, email, userId }, secret, tokenOptions);
  return token;
};

export const encryptPassword = async (password) => {
  const salt = await genSalt(12);
  const hashed = await hash(password, salt);
  return hashed;
};

export const verifyLink = (token, secret) => {
  try {
    const data = verify(token, secret);
    return data;
  } catch (error) {
    return error;
  }
};

// export default (req, res, next) => {
//   if (!req.headers.authorization) {
//     return res.status(401).send({ error: "unthorized" });
//   }
//   const token = req.headers.authorization.split(" ")[1];
//   JWT_SECRET.verify(token, process.env.JWT_SECRET, {expiresIn: '24', } (error, decoded =>{
//     if(error) {
//       return res.status(404).send({ error })
//     }
//     req.decoded = decoded;
//     console.log(req.decoded);
//     user.findByPk(decoded.userId)
//   }))
// }