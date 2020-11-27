/* eslint-disable linebreak-style */
import app from "../index";

import { User, User as _user } from "../database/models";
const chai = require("chai");
const chaiHttp = require("chai-http");

let user = null;
let token = null;
let requester = null;
let manager = null;
let userLoginData = null;
let requesterLoginData = null;
chai.should();
chai.use(chaiHttp);

describe("User roles API", () => {
  user = {
    email: "fake@gmail.com",
    first_name: "fake",
    last_name: "fakest",
    role: "super-admin",
    isConfirmed: true,
    password: "$2b$08$yL14cQRwHeHh/BWN3xAADuQg0zhzapYqZ12K7G69e.Mi/NTKu2PF2",
    confirmPassword: "$2b$08$yL14cQRwHeHh/BWN3xAADuQg0zhzapYqZ12K7G69e.Mi/NTKu2PF2"
  };
  requester = {
    id: 2000,
    email: "requester@gmail.com",
    first_name: "fake",
    last_name: "fakest",
    role: "requester",
    isConfirmed: true,
    password: "$2b$08$DVCvWE8g6dyWgqE2F6pXSu7ihoG6S40n4JujBodZPTEvvd0voLQ92",
  };
  manager = {
    id: 3000,
    email: "manager@gmail.com",
    first_name: "fake",
    last_name: "fakest",
    role: "manager",
    isConfirmed: true,
    password: "$2b$08$DVCvWE8g6dyWgqE2F6pXSu7ihoG6S40n4JujBodZPTEvvd0voLQ92",
  };
  before(async () => {
    User.create({
      id: 3001,
      email: "manager1@gmail.com",
      first_name: "fake",
      last_name: "fakest",
      isConfirmed: true,
      role: "manager",
      password: "$2b$08$DVCvWE8g6dyWgqE2F6pXSu7ihoG6S40n4JujBodZPTEvvd0voLQ92",
    });
  });
  beforeEach(async () => {
    User.create(requester);
    User.create(manager);
    await User.create(user);
  });

  afterEach(async () => {
    await User.destroy({ where: { email: "fake@gmail.com" } });
    await User.destroy({ where: { email: "requester@gmail.com" } });
    await User.destroy({ where: { email: "manager@gmail.com" } });
  });
  after(async () => {
    User.destroy({ where: {} });
  });
  requesterLoginData = {
    email: "fake@gmail.com",
    password: "test1234",
  };
  userLoginData = {
    email: "fake@gmail.com",
    password: "alexis1223",
  };

  it("It should return 200 status code login valid credidential", (done) => {
    chai
      .request(app)
      .post(`/api/user/login`)
      .send(userLoginData)
      .end((error, response) => {
        if (error) return done(error);
        token = response.body.accessToken;
        response.should.have.status(200);
        response.body.should.have.property("accessToken");
        done();
      });
  });

  it("PUT /api/user/roles/:id It should return 200 on user role update to manager", (done) => {
    const role = {
      role: "manager",
    };
    chai
      .request(app)
      .put(`/api/user/roles/2000`)
      .set("auth-token", token)
      .send(role)
      .end((error, response) => {
        if (error) return done(error);
        response.should.have.status(200);
        done();
      });
  });

  it("PUT /api/user/roles/:id It should return 200 on user role update to requester", (done) => {
    const role = {
      role: "requester",
    };
    chai
      .request(app)
      .put(`/api/user/roles/3001`)
      .set("auth-token", token)
      .send(role)
      .end((error, response) => {
        if (error) return done(error);
        response.should.have.status(200);
        done();
      });
  });
  it("PUT /api/user/roles/:id It should return 400 if there is no request body", (done) => {
    chai
      .request(app)
      .put(`/api/user/roles/3001`)
      .set("auth-token", token)
      .end((error, response) => {
        if (error) return done(error);
        response.should.have.status(400);
        done();
      });
  });

  it("PUT /api/user/roles/:id It should return 404 on user role update", (done) => {
    const role = {
      role: "requester",
    };
    chai
      .request(app)
      .put(`/api/user/roles/0`)
      .set("auth-token", token)
      .send(role)
      .end((error, response) => {
        if (error) return done(error);
        response.should.have.status(404);
        done();
      });
  });

  it("PUT /api/user/roles/:id It should return 401 on user role update", (done) => {
    const role = {
      role: "manager",
    };
    chai
      .request(app)
      .put(`/api/user/roles/1000`)
      .send(role)
      .end((error, response) => {
        if (error) return done(error);
        response.should.have.status(401);
        done();
      });
  });
  it("PUT /api/user/roles/:id It should return 500 if something is not right", (done) => {
    const role = {
      role: "manager",
    };
    chai
      .request(app)
      .put(`/api/user/roles/1000`)
      .set('auth-token', 'kkrje')
      .send(role)
      .end((error, response) => {
        if (error) return done(error);
        response.should.have.status(500);
        done();
      });
  });
});
