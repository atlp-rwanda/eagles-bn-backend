import { User as _user } from "../database/models/index";
import { signToken } from "../helpers/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { encryptPassword, verifyLink } from "../helpers";
import _, { result } from "lodash";

const mailgun = require("mailgun-js");
const DOMAIN = "sandbox2a5a88ce88af4fc8a90005f49041a655.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });

export default class UserController {
  static async userSignUp(req, res, next) {
    let { first_name, last_name, email, password } = req.body;
    let foundUser = await _user.findOne({ where: { email: email } });
    if (foundUser) {
      return res.status(403).json({ error: "Email is already in use" });
    } else {
      try {
        const user = await _user.create({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: bcrypt.hashSync(password, 8),
        });
        const tokObj = {
          id: user.id,
          name: user.first_name,
          email: user.email,
        };

        const token = signToken(tokObj);
        res.status(201).json(signToken(tokObj));
      } catch (err) {
        res.status(500).send({ error: err });
      }
    }
  }

  static async forgetPassword(req, res, next) {
    let { email } = req.body;
    let foundUser = await _user.findOne({ where: { email: email } });
    if (foundUser) {
      const token = jwt.sign(
        { email: foundUser.email, _id: foundUser._id },
        foundUser.password,
        {
          expiresIn: "24h",
        }
      );
      const data = {
        from: "alexis2020@gmail.com",
        to: email,
        subject: "please reset your Password",
        html: `click this link to reset password http://localhost:4000/api/resetPassword/${token}/${email}`,
      };
      mg.messages().send(data, function (error) {
        res.status(201).json({
          message: "email has been sent please change your password",
        });
      });
    } else {
      return res.status(403).json({ error: "user email doesn't exist" });
    }
  }

  static async resetPassword(req, res, next) {
    const { email } = req.params;
    let foundUser = await _user.findOne({ where: { email: email } });
    const password = await encryptPassword(req.body.password);
    try {
      const { email } = verifyLink(req.params.token, foundUser.password);
      if (!email)
        return res.status(404).json({ message: "user not email not found" });
      const [user] = await _user.update({ password }, { where: { email } });
      res.status(200).json({
        success: true,
        message: `Thank you! You can now use your new password to login!`,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "you token are invalid" });
    }
  }
}
