import { roles } from "../helpers/roles";

export default class UseRole {
  static IsRequestor(req, res, next) {
    if (roles.REQUESTER !== req.user.role) {
      return res.status(403).send({ error: "Not Allowed to rate" });
    }
    next();
  }

  static IsuperAdmin(req, res, next) {
    if (roles.SUPER_ADMIN !== req.user.role) {
      return res.status(403).send({ error: "Not Allowed to rate" });
    }
    next();
  }

  static IsAdmin(req, res, next) {
    const first = req.user.role;
    const second = roles.ADMIN;
    if (first !== second) {
      return res.status(403).send({ error: "Not Allowed to rate" });
    }
    next();
  }

  static IsManager(req, res, next) {
    const first = req.user.role;
    const second = roles.MANAGER;
    if (first !== second) {
      return res.status(403).send({ error: "Not Allowed to rate" });
    }
    next();
  }
}
