/* eslint-disable linebreak-style */
import { config } from 'dotenv';
import { sign, verify } from 'jsonwebtoken';
import { genSalt, hash } from 'bcryptjs';

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
