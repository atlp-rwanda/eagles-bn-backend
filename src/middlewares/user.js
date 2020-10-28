import jwt from "jsonwebtoken";
import userAuthentication from "../validators/user";

export default class UserValidation {
  static userAuth(req, res, next) {
    const auth = userAuthentication(req.body);
    if (auth.error) {
      res.send({ error: auth.error.details[0].message });
    }
    next();
  }
  static verifyToken(req, res, next) {
    try {
      const { token } = req.params;

      if (!token) {
        return res.json({ error: "It seems like something went wrong!!" });
      }
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_ACCOUNT_VEIRIFICATION
      );
      req.decoded = decodedToken;
      console.log(req.decoded);
      return next();
    } catch (err) {
      if (err.message === "jwt malformed" || err.message === "jwt expired") {
        return res
          .status(400)
          .json({ error: "You are using Incorrect or Expired Link!" });
      }
      return res.status(500).json({Error: 'Internal Error!'});
    }
  }
}
