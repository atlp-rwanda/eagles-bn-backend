/* eslint-disable linebreak-style */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { after } from "mocha";
import path from 'path';
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

  it('should not update the profile without the token', (done) => {
    chai
      .request(server)
      .patch('/api/user/profile')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('birth_date', "1900-01-02")
      .field('preferred_language', "SWAHILI")
      .field('where_you_live', "Ruhondo")
      .field('preferred_currency', "Dollars")
      .field('father_name', "Ruganzu")
      .field('mother_name', "Ndori")
      .field('gender', "Female")
      .field('phone_number', "078999999999")
      .field('nationality', "Burundian")
      .field('marital_status', "Single")
      .attach('profile_image', path.join(__dirname, 'assets/girl.JPG'))
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("error", "Unauthorized");
        done(err);
      });
  });

  it('should be able to Update the Profile once is logged in', (done) => {
    chai
      .request(server)
      .patch('/api/user/profile')
      .set('auth-token', token)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('birth_date', "1900-01-02")
      .field('preferred_language', "SWAHILI")
      .field('where_you_live', "Ruhondo")
      .field('preferred_currency', "Dollars")
      .field('father_name', "Ruganzu")
      .field('mother_name', "Ndori")
      .field('gender', "Female")
      .field('phone_number', "078999999999")
      .field('nationality', "Burundian")
      .field('marital_status', "Single")
      .attach('profile_image', path.join(__dirname, 'assets/girl.JPG'))
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message', 'Profile updated sucessfully');
        done(err);
      });
  }).timeout(50000);

  it('should raise the validation error', (done) => {
    chai
      .request(server)
      .patch('/api/user/profile')
      .set('auth-token', token)
      .field('birth_date', "1900-01-02")
      .field('preferred_language', "SWAHILI")
      .field('where_you_live', "Ruhondo")
      .field('preferred_currency', "Dollars")
      .field('father_name', "R")
      .field('mother_name', "Ndori")
      .field('gender', "Female")
      .field('phone_number', "078999999999")
      .field('nationality', "Burundian")
      .field('marital_status', "Single")
      .attach('profile_image', path.join(__dirname, 'assets/girl.JPG'))
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('error', 'father_name length must be at least 3 characters long');
        done(err);
      });
  }).timeout(50000);

  it('should raise the image error', (done) => {
    chai
      .request(server)
      .patch('/api/user/profile')
      .set('auth-token', token)
      .field('birth_date', "1900-01-02")
      .field('preferred_language', "SWAHILI")
      .field('where_you_live', "Ruhondo")
      .field('preferred_currency', "Dollars")
      .field('father_name', "Rudasumbwaaa")
      .field('mother_name', "Ndori")
      .field('gender', "Female")
      .field('phone_number', "078999999999")
      .field('nationality', "Burundian")
      .field('marital_status', "Single")
      .attach('profile_image', path.join(__dirname, 'assets/user.js'))
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'Profile Image has to be an image type');

        done(err);
      });
  }).timeout(50000);

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
  it('should return 500', (done) => {
    chai.request(server)
      .post('/api/user/logout')
      .set(user.invalidToken)
      .end((err, res) => {
        expect(res).to.have.status(500);
        done(err);
      });
  });
};

export default logout;
