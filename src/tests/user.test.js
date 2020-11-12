/* eslint-disable linebreak-style */
import chai from 'chai';
import { describe, it } from 'mocha';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import app from '../index';
import models from '../database/models';
import { signToken } from '../helpers/auth';

chai.use(chaiHttp);
const { expect } = chai;
const { request } = chai;

describe(' POST /api/user/resetPassword/', () => {
  it('It should change password', (done) => {
    const userData = {
      first_name: 'alexis',
      last_name: 'work',
      email: 'nklbigone@gmail.com',
      password: 'alexis123',
    };
    const token = jwt.sign(
      {
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
      },
      userData.password,
      {
        expiresIn: '24h',
      }
    );
    models.User.create(userData)
      .then((createdUser) => {
        const token = signToken(userData, createdUser.password);
        chai
          .request(app)
          .put(`/api/user/resetPassword/${token}/${userData.email}`)
          .send(userData)
          .end((err, response) => {
            expect(response).to.have.status(200);
            expect(response).to.be.json;
            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
  //   it("It should not change password if token is invalid", (done) => {
  //     const userData = {
  //       first_name: "alexis",
  //       last_name: "work",
  //       email: "nklbigon@gmail.com",
  //       password: "alexis123",
  //     };
  //     models.User.create(userData)
  //       .then(() => {
  //         const password = "alexis4321";
  //         chai
  //           .request(app)
  //           .put(
  //             "/api/user/resetPassword/:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJlbWFpbCI6Im5rbGJpZ29uZUBnbWFpbC5jb20iLCJpYXQiOjE2MDM3OTk2OTcsImV4cCI6MTYwMzg4NjA5N30.olo518Ek846j-XJsk_YH801HWY_UCKfEWwWWm8klsYc/:nklbigone@gmail.com"
  //           )
  //           .send({ password })
  //           .end((err, response) => {
  //             expect(response).to.have.status(400);
  //             done();
  //           });
  //       })
  //       .catch((err) => {
  //         done(err);
  //       });
  //   });
});
describe(' POST /api/user/forgetPassword', () => {
  before(async () => {
    await models.User.destroy({ where: { email: 'nklbigone@gmail.com' } });
  });
  after(async () => {
    await models.User.destroy({ where: { email: 'nklbigone@gmail.com' } });
  });
  it('It should return send email', (done) => {
    const userData = {
      first_name: 'alexis',
      last_name: 'work',
      email: 'nklbigone@gmail.com',
      password: 'alexis123',
    };

    models.User.create(userData)
      .then(() => {
        const email = 'nklbigone@gmail.com';
        chai
          .request(app)
          .post('/api/user/forgetPassword')
          .send({ email })
          .end((err, response) => {
            expect(response).to.have.status(201);
            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });

  it('It should not find user', (done) => {
    const email = 'gone@gmail.com';
    chai
      .request(app)
      .post('/api/user/forgetPassword')
      .send({ email })
      .end((err, response) => {
        expect(response).to.have.status(403);
        done();
      });
  });
});

describe('USER SIGNUP TESTS', () => {
  before((done) => {
    models.User.destroy({
      where: {},
      // truncate: true,
    }).then(() => {
      models.User.create({
        first_name: 'Solange',
        last_name: 'Iyubu',
        email: 's@ymail.com',
        password: 'solasola',
      }).then(() => {
        done();
      });
    });
  });

  describe('POST/signup', () => {
    it('it should signUp a user', (done) => {
      request(app)
        .post('/api/user/signup')
        .send({
          first_name: 'Gahozo',
          last_name: 'Ntwari',
          email: 'sinang@gmail.com',
          password: '123456789',
          confirmPassword: '123456789',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          done();
        });
    });
  });

  describe('POST/signup', () => {
    it('it should raise email existance error', (done) => {
      request(app)
        .post('/api/user/signup')
        .send({
          first_name: 'Gahozo',
          last_name: 'Ntwari',
          email: 's@ymail.com',
          password: '123456789',
          confirmPassword: '123456789',
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST/signup', () => {
    it('it should raise email format error', (done) => {
      request(app)
        .post('/api/user/signup')
        .send({
          first_name: 'Gahozo',
          last_name: 'Ntwari',
          email: 'sos@ymail',
          password: '123456789',
          confirmPassword: '123456789',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property(
            'error',
            '"email" must be a valid email'
          );
          done();
        });
    });
  });

  describe('POST/signup', () => {
    it('it should first_name validation error', (done) => {
      request(app)
        .post('/api/user/signup')
        .send({
          first_name: '',
          last_name: 'Ntwari',
          email: 'g@ymail',
          password: '123456789',
          confirmPassword: '123456789',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property(
            'error',
            '"first_name" is not allowed to be empty'
          );
          done();
        });
    });
  });

  describe('POST/signup', () => {
    it('it should first_name validation error', (done) => {
      request(app)
        .post('/api/user/signup')
        .send({
          first_name: 'Gahozo',
          last_name: '',
          email: 'g@ymail',
          password: '123456789',
          confirmPassword: '123456789',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property(
            'error',
            '"last_name" is not allowed to be empty'
          );
          done();
        });
    });
  });
});
