/* eslint-disable linebreak-style */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mailgun from 'mailgun-js';
import dotenv from 'dotenv';
import { encryptPassword, verifyLink } from '../helpers';
import { User as _user } from '../database/models/index';
import { onError, onSuccess } from '../utils/response';
import { signToken } from '../helpers/auth';
import signAccessToken from '../helpers/jwt_helper';
import client from '../config/redis_config';
import { roleEntryValidation } from '../helpers/file-uploader';
import { managers } from '../helpers/managers';
import { roles } from '../helpers/roles';
import { cloudinaryUpload } from '../helpers/cloudinary-upload';

dotenv.config();

const { DOMAIN_NAME } = process.env;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: DOMAIN_NAME,
});

export default class UserController {
  static async userSignUp(req, res) {
    const { first_name, last_name, email, password, role } = req.body;
    const foundUser = await _user.findOne({ where: { email } });
    if (foundUser) {
      return res.status(403).json({ error: 'Email is already in use' });
    }
    try {
      const emailVerificationToken = jwt.sign(
        {
          first_name,
          last_name,
          email,
          role,
        },
        process.env.JWT_ACCOUNT_VEIRIFICATION,
        { expiresIn: '72h' }
      );
      const data = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'Account Verification Email_BareFootNormad',
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

        signToken(tokObj);
        return res.status(200).json({
          emailVerificationToken,
          message:
            'Thanks for registering on our site. Verification Email has been sent to you. Please visit your email to verify your account',
        });
      });
    } catch (err) {
      res.status(500).send({ error: err });
    }
  }

  static async forgetPassword(req, res, next) {
    const { email } = req.body;
    const foundUser = await _user.findOne({ where: { email } });
    if (foundUser) {
      const token = jwt.sign(
        { email: foundUser.email, _id: foundUser._id },
        foundUser.password,
        {
          expiresIn: '24h',
        }
      );
      const data = {
        from: 'alexis2020@gmail.com',
        to: email,
        subject: 'please reset your Password',
        html: `click this link to reset password http://localhost:4000/api/resetPassword/${token}/${email}`,
      };
      mg.messages().send(data, (error) => {
        res.status(201).json({
          message: 'email has been sent please change your password',
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
    const { email: useremail } = verifyLink(
      req.params.token,
      foundUser.password
    );
    if (!useremail) return res.status(404).json({ message: 'user not email not found' });
    await _user.update({ password }, { where: { email: useremail } });
    res.status(200).json({
      success: true,
      message: 'Thank you! You can now use your new password to login!',
    });
  }

  static async changeRoles(req, res) {
    await roleEntryValidation.validateAsync(req.body).catch((err) =>
      res.status(400).json({ error: err.details[0].message.replace(/^"|"$/g, '') })
    );
    const { role } = req.body;
    const userId = req.params.id;
    const user = await _user.findOne({ where: { id: userId } });
    if (!user) return res.status(404).send({ error: 'User not found' });
    if (user.role === role) return res.status(400).send({ error: `${user.first_name} is already ${role}` });
    if (role === roles.REQUESTER) {
      await _user.update(
        { role, manager: managers.DEFAULT_MANAGER },
        { where: { id: userId } }
      );
    } else await _user.update({ role }, { where: { id: userId } });
    return res.status(200).send({ message: `${user.first_name}'s role changed to ${role}` });
  }

  static async emailVerification(req, res) {
    const user = await _user.findOne({ where: { email: req.decoded.email } });
    if (!user) return onError(res, 404, 'user Not Found');

    await _user.update(
      { isConfirmed: true },
      { where: { email: req.decoded.email } }
    );

    return res.status(200).json({
      status: 200,
      Message: 'User confirmed Successfully!',
    });
  }

  static async current(req, res) {
    const { dataValues: user } = await _user.findByPk(req.user.id);
    return res.send({ data: { ...user, password: null } });
  }

  static async login(req, res) {
    const user = await _user.findOne({ where: { email: req.body.email } });
    if (!user) return onError(res, 404, 'Invalid Email or Password');
    if (!user.isConfirmed) return onError(res, 403, 'Account not activated');
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return onError(res, 401, 'Incorrect email or password');
    const token = await signAccessToken(user.dataValues);
    res.status(200).json({
      status: 200,
      accessToken: token,
      message: 'User Logged in successfully',
    });
  }

  static async logout(req, res) {
    const { id: userId } = req.user;
    client.del(userId);
    return onSuccess(res, 200, 'You logged out successfully.');
  }

  static async RememberTravel(req, res) {
    const { id: userId } = req.user;
    const { dataValues: user } = await _user.findByPk(userId);
    _user.update(
      { remember_travel: !user.remember_travel },
      { where: { id: userId } }
    );
    return onSuccess(
      res,
      200,
      `Remember status updated to ${!user.remember_travel ? 'yes' : 'no'}`
    );
  }

  static async profilePicture(req, res) {
    const image = req.files.profile_image;
    if (image.type.split('/')[0] !== 'image') {
      return onError(res, 400, 'Profile Image has to be an image type');
    }
    const imageUrl = await cloudinaryUpload(image.path);
    const [_, { dataValues: user }] = await _user.update({
      profile_image: imageUrl,
    }, {
      where: { id: req.user.id },
      returning: true,
      plain: true,
    });
    return onSuccess(res, 200, 'Profile Picture updated sucessfully', user.profile_image);
  }

  static returnProfile(data) {
    return {
      birth_date: data.birth_date,
      preferred_language: data.preferred_language,
      preferred_currency: data.preferred_currency,
      where_you_live: data.where_you_live,
      father_name: data.father_name,
      mother_name: data.mother_name,
      first_name: data.first_name,
      last_name: data.last_name,
      gender: data.gender,
      phone_number: data.phone_number,
      nationality: data.nationality,
      marital_status: data.marital_status,
      profile_image: data.profile_image
    };
  }

  static async userProfile(req, res) {
    const [_, { dataValues: data }] = await _user.update(req.body, {
      where: { id: req.user.id },
      returning: true,
      plain: true
    });

    return onSuccess(res, 200, 'Profile updated sucessfully', UserController.returnProfile(data));
  }

  static async getProfile(req, res) {
    const user = await _user.findByPk(req.user.id);

    return onSuccess(res, 200, 'Profile updated sucessfully', UserController.returnProfile(user));
  }
}
