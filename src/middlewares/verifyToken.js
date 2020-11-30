/* eslint-disable linebreak-style */
import jwt from "jsonwebtoken";
import { onError } from "../utils/response";
import client from "../config/redis_config";

const verifyAccessToken = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return onError(res, 401, "Unauthorized");
  await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decod) => {
    if (error) {
      return onError(res, 401, 'Token is incorrect or expired!');
    }
    client.get(decod.payload.id, (err, val) => {
      if (decod.payload) {
        if (val) {
          req.user = decod.payload;
          return next();
        }
        return onError(
          res,
          401,
          "User already logged out, Please Login and try again!"
        );
      }
    });
  });
};
export default verifyAccessToken;
