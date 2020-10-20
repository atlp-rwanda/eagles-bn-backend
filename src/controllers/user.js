import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";
import dotenv from "dotenv";
import _ from "lodash";
import { encryptPassword, verifyLink } from "../helpers";
import { signToken } from "../helpers/auth";
import { User as _user } from "../database/models/index";

dotenv.config();

const { DOMAIN_NAME } = process.env;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: DOMAIN_NAME,
});

// const DOMAIN = "sandbox2a5a88ce88af4fc8a90005f49041a655.mailgun.org";

export default class UserController {
  static async userSignUp(req, res) {
    const { first_name, last_name, email, password } = req.body;
    const foundUser = await _user.findOne({ where: { email } });
    if (foundUser) {
      return res.status(403).json({ error: "Email is already in use" });
    }
    try {
      const emailVerificationToken = jwt.sign(
        {
          first_name,
          last_name,
          email,
        },
        process.env.JWT_ACCOUNT_VEIRIFICATION,
        { expiresIn: "72h" }
      );
      const data = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Account Verification Email_BareFootNormad",
        text: `
          Please copy and paste the text below on your browser for verify your account!
    
        `,
        html: `
            <p>Thanks for registering on our site. Please click the link below to verify your account.</p>
            <p>${process.env.USER_URL}/accountverification/${emailVerificationToken}</p>
            <p>Please note that if you do not verify your email address within 3 days, the verification code above will expire and you will need to re-register again.</p>
    
        `,
      };
      mg.messages().send(data, (error) => {
        if (error) {
          return res.json({ error: error.message });
        }
        const user = _user.create({
          first_name,
          last_name,
          email,
          password: bcrypt.hashSync(password, 8),
          isConfirmed: false,
        });
        const tokObj = {
          id: user.id,
          name: user.first_name,
          email: user.email,
        };

        // const token = signToken(tokObj);
        return res.status(200).json({
          emailVerificationToken,
          message:
            "Thanks for registering on our site. Verification Email has been sent to you. Please visit your email to verify your account",
        });
      });
    } catch (err) {
      res.status(500).send({ error: err });
    }
  }

  static async forgetPassword(req, res) {
    const { email } = req.body;
    const foundUser = await _user.findOne({ where: { email } });
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
      mg.messages().send(data, (error) => {
        res.status(201).json({
          token,
          message: "email has been sent please change your password",
        });
      });
    } else {
      return res.status(403).json({ error: "user email doesn't exist" });
    }
  }

  static async resetPassword(req, res) {
    const { email } = req.params;
    const foundUser = await _user.findOne({ where: { email } });
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
      // const token = signToken(tokObj);
    }
  }

  static async emailVerification(req, res) {
    try {
      const user = await _user.findOne({
        where: { email: req.decoded.email },
      });

      if (!user) {
        return res.status(404).json({
          status: 404,
          Error: "user Not Found",
        });
      }

      await _user.update(
        { isConfirmed: true },
        { where: { email: req.decoded.email } }
      );

      return res.status(200).json({
        status: 200,
        Message: "User confirmed Successfully!",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ error: err });
    }
  }

  static async login(req, res) {
    const user = await _user.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      return res
        .status(404)
        .json({ status: 404, error: "Invalid Email or Password" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).json({
        status: 401,
        error: "Incorrect email or password",
      });
    }

    res.status(200).json({
      status: 200,
      token: signToken(user),
      message: "User Logged in successfully",
    });
  }
}
