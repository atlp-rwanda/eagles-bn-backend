import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { User } from '../../database/models';
import { fakeRequesterCredentials } from '../mock-user.data';
import signAccessToken from '../../helpers/jwt_helper';
import app from '../../index';

chai.use(chaiHttp);
let token;
export default () => {
  before(async () => {
    await User.destroy({ where: { email: fakeRequesterCredentials.email } });
    const { dataValues: user } = await User.create(fakeRequesterCredentials);
    token = await signAccessToken(user);
  });
  after(async () => {
    await User.destroy({ where: { password: fakeRequesterCredentials.password } });
  });
  it("toggle remember travel", async () => {
    const res = await chai
      .request(app)
      .put(`/api/user/remember-travel`)
      .set("auth-token", token);
    expect(res).to.have.property("status", 200);
  });
};
