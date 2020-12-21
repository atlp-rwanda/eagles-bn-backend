/* eslint-disable linebreak-style */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { after } from "mocha";
import user from './assets/user';
import { User } from "../database/models";
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);

const logout = () => {
  after(async () => {
    await User.destroy({ where: { email: "fake@gmail.com" } });
  });
  const fakeUser = {
    email: "fake@gmail.com",
    first_name: "fake",
    last_name: "fakest",
    isConfirmed: true,
    password: "$2b$08$DVCvWE8g6dyWgqE2F6pXSu7ihoG6S40n4JujBodZPTEvvd0voLQ92",
  };
  const fakeCredentials = {
    email: "fake@gmail.com",
    password: "test1234",
  };
  let token;
  it('should login before logging logout', async () => {
    await User.create(fakeUser);

    const res = await chai
      .request(server)
      .post('/api/user/login')
      .send(fakeCredentials);
    token = res.body.accessToken;
    expect(res).to.have.status(200);
  });

  it('should be able to logout once is logged in', (done) => {
    chai
      .request(server)
      .post('/api/user/logout')
      .set("auth-token", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'You logged out successfully.');
        done(err);
      });
  });
  it('should not logout if is already logout', (done) => {
    chai
      .request(server)
      .post('/api/user/logout')
      .set("auth-token", token)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('error', 'User already logged out, Please Login and try again!');
        done(err);
      });
  });
  it('should not logout if there is no token provided or it is invalid token', (done) => {
    chai.request(server)
      .post('/api/user/logout')
      .set(user.noToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('error', 'Unauthorized');
        done(err);
      });
  });
  it('should return 401 if token is invalid', (done) => {
    chai.request(server)
      .post('/api/user/logout')
      .set(user.invalidToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done(err);
      });
  });
};

export default logout;
