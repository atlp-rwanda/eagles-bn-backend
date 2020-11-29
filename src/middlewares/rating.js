import { roles } from "../helpers/roles";

export default class resquestor {
  static IsRequestor(req, res, next) {
    if (roles.REQUESTER !== req.user.role) {
      return res.status(403).send({ error: "Not Allowed" });
    }
    next();
  }

  static IsAdmin(req, res, next) {
    const first = req.user.role;
    const second = roles.ADMIN;
    if (first !== second) {
      return res.status(403).send({ error: "Not Allowed" });
    }
    next();
  }
}
