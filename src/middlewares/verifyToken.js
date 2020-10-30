/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import { onError } from '../utils/response';
import { User as _user } from '../database/models/index';
import client from '../config/redis_config';

const verifyAccessToken = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return onError(res, 401, 'Unauthorized');
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userExists = await _user.findOne({
      where: { email: verified.payload.email }
    });
    client.get(verified.payload.id, (err, val) => {
      if (userExists) {
        if (val === token) {
          req.user = userExists;
          return next();
        }
        return onError(res, 401, 'User already logged out, Please Login and try again!');
      }
    });
  } catch (error) {
    return onError(res, 500, 'Internal server error');
  }
};
export default verifyAccessToken;
