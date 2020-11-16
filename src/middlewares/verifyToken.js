/* eslint-disable linebreak-style */
import jwt from "jsonwebtoken";
import { onError } from "../utils/response";
import client from "../config/redis_config";

const verifyAccessToken = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return onError(res, 401, "Unauthorized");
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    client.get(verified.payload.id, (err, val) => {
      if (verified.payload) {
        if (val) {
          req.user = verified.payload;
          return next();
        }
        return onError(
          res,
          401,
          "User already logged out, Please Login and try again!"
        );
      }
    });
  } catch (error) {
    console.log(error);
    return onError(res, 500, "Internal server error");
  }
};
export default verifyAccessToken;
