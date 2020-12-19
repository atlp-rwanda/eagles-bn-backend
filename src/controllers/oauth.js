/* eslint-disable linebreak-style */

import signAccessToken from '../helpers/jwt_helper';

class Oauth {
  static async loginSuccess(req, res) {
    const token = await signAccessToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
  }
}

export default Oauth;
