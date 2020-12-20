/* eslint-disable linebreak-style */
import chai, { expect, request } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import path from 'path';
import app from '../index';
import models from '../database/models';
import { signToken } from '../helpers/auth';
import signAccessToken from '../helpers/jwt_helper';

chai.use(chaiHttp);

describe(' POST /api/user/resetPassword/', () => {
  it('It should not change password on no email supplied', (done) => {
    const userData = {
      first_name: 'alexis',
      last_name: 'work',
      email: 'nklbigone@gmail.com',
      password: 'alexis123',
    };
    models.User.create(userData)
      .then(({ password, first_name, last_name }) => {
        const token = jwt.sign({ first_name, last_name }, password, { expiresIn: '24h' });
        chai
          .request(app)
          .put(`/api/user/resetPassword/${token}/${userData.email}`)
          .send(userData)
          .end((err, response) => {
            expect(response).to.have.status(404);
            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
  it('It should change password', (done) => {
    const userData = {
      first_name: 'alexiss',
      last_name: 'works',
      email: 'nklbigones@gmail.com',
      password: 'alexiss123',
    };
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
      where: { email: 's@ymail.com' },
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
          expect(res.status).to.equal(400);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property(
            'error',
            '"email" must be a valid email'
          );
          done();
        });
    });
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
          expect(res.status).to.equal(400);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property(
            'error',
            '"first_name" is not allowed to be empty'
          );
          done();
        });
    });
    it('it should last_name validation error', (done) => {
      request(app)
        .post('/api/user/signup')
        .send({
          first_name: 'Gahozo',
          last_name: '',
          email: 'goo@ymail.rw',
          password: '123456789',
          confirmPassword: '123456789',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
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

describe('USER PROFILE TESTS', () => {
  beforeEach(async () => { await models.User.destroy({ where: { email: 'fake' } }); });
  afterEach(async () => { await models.User.destroy({ where: { email: 'fake' } }); });
  const userData = {
    first_name: "Eagle",
    last_name: "Doe",
    email: "fake",
    password: "password",
    role: "manager",
    manager: 3,
    isConfirmed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('fetches user profile', async () => {
    const user = await models.User.create(userData);
    const token = await signAccessToken(user);
    const res = await chai.request(app).get('/api/user/profile').set('auth-token', token);
    expect(res).to.have.property('status', 200);
  });
  it('updates user profile first_name', async () => {
    const user = await models.User.create(userData);
    const token = await signAccessToken(user);
    const newFirstName = 'new one';
    const res = await chai.request(app)
      .patch('/api/user/profile')
      .set('auth-token', token)
      .send({ first_name: newFirstName });
    expect(res).to.have.property('status', 200);
    expect(res.body.data).to.have.property('first_name', newFirstName);
  });
  it('should fail to update user profile first_name on very long name', async () => {
    const user = await models.User.create(userData);
    const token = await signAccessToken(user);
    const newFirstName = 'lorem ipsum dolor ipusi yacu ntgo ikeneye ko bino bintu byaza gukunda';
    const res = await chai.request(app)
      .patch('/api/user/profile')
      .set('auth-token', token)
      .send({ first_name: newFirstName });
    expect(res).to.have.property('status', 400);
  });
  it('should update the profile image', async () => {
    const user = await models.User.create(userData);
    const token = await signAccessToken(user);
    const res = await chai.request(app)
      .patch('/api/user/profile/picture')
      .set('Content-Type', 'multipart/form-data')
      .set('auth-token', token)
      .attach('profile_image', path.join(__dirname, 'assets/girl.JPG'));
    expect(res).to.have.status(200);
  });
  it('should fail to update the profile image if not supported image', async () => {
    const user = await models.User.create(userData);
    const token = await signAccessToken(user);
    const res = await chai.request(app)
      .patch('/api/user/profile/picture')
      .set('auth-token', token)
      .attach('profile_image', path.join(__dirname, 'assets/fake.txt'));
    expect(res).to.have.status(400);
  });
});

describe('CURRENT SIGNED USER', () => {
  beforeEach(async () => { await models.User.destroy({ where: { email: 'fake' } }); });
  afterEach(async () => { await models.User.destroy({ where: { email: 'fake' } }); });
  const userData = {
    first_name: "Eagle",
    last_name: "Doe",
    email: "fake",
    password: "password",
    role: "manager",
    manager: 3,
    isConfirmed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('fetches user', async () => {
    const user = await models.User.create(userData);
    const token = await signAccessToken(user);
    const res = await chai.request(app).get('/api/user/current').set('auth-token', token);
    expect(res).to.have.property('status', 200);
  });
});
