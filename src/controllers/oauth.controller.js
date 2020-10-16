import { signToken } from '../helpers/auth';

class OauthController {
  static async loginSuccess(req, res) {
    const token = signToken(req.user);
    res.send({ message: 'Login succeed', token });
  }
}

export default OauthController;
