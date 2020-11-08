/* eslint-disable linebreak-style */
import jwt from "jsonwebtoken";
import passport from "passport";
import userValidation from "../validators/user";

export default class User {
  static validate(req, res, next) {
    const auth = userValidation(req.body);
    if (auth.error) {
      return res.send({ error: auth.error.details[0].message });
    }
    next();
  }

  static verifyToken(req, res, next) {
    try {
      const { token } = req.params;

      const decodedToken = jwt.verify(
        token,
        process.env.JWT_ACCOUNT_VEIRIFICATION
      );
      req.decoded = decodedToken;
      return next();
    } catch (err) {
      if (err.message === "jwt malformed" || err.message === "jwt expired") {
        return res
          .status(400)
          .json({ error: "You are using Incorrect or Expired Link!" });
      }
      console.log(err);
      return res.status(500).json({ Error: "Internal Error!" });
    }
  }

  static auth(req, res, next) {
    return passport.authenticate("jwt", { session: false })(req, res, next);
  }

  static isSuperAdmin(role) {
    return (req, res, next) => {
      if (req.user.role != role) {
        return res.status(403).send({ error: "Not Allowed" });
      }
      next();
    };
  }

  static IsAllowed(role) {
    return (req, res, next) => {
      if (req.user.role != role) {
        return res.status(403).send({ error: "Not Allowed" });
      }
      next();
    };
  }
}
