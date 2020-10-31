/* eslint-disable linebreak-style */

import signAccessToken from '../helpers/jwt_helper';

class Oauth {
  static async loginSuccess(req, res) {
    const token = signAccessToken(req.user);
    res.send({ message: "Login succeed", token });
  }
}

export default Oauth;
