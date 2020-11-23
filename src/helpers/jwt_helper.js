/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import client from '../config/redis_config';

const signAccessToken = (userInfo) => {
  try {
    const payload = {
      id: userInfo.id,
      email: userInfo.email,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      role: userInfo.role,
      manager: userInfo.manager
    };
    const token = jwt.sign({ payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    client.set(payload.id, token);
    return token;
  } catch (error) {
    return error;
  }
};

export default signAccessToken;
