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
  beforeEach(async () => {
    await User.destroy({ where: { email: "fake@gmail.com" } });
  });

  afterEach(async () => {
    await User.destroy({ where: { email: "fake@gmail.com" } });
  });

  user = {
    id: 1000,
    email: "fake@gmail.com",
    first_name: "fake",
    last_name: "fakest",
    role: "super-admin",
    password: "$2b$08$DVCvWE8g6dyWgqE2F6pXSu7ihoG6S40n4JujBodZPTEvvd0voLQ92",
  };
  requester = {
    id: 2000,
    email: "fake@gmail.com",
    first_name: "fake",
    last_name: "fakest",
    role: "requester",
    password: "$2b$08$DVCvWE8g6dyWgqE2F6pXSu7ihoG6S40n4JujBodZPTEvvd0voLQ92",
  };
  manager = {
    id: 3000,
    email: "fake@gmail.com",
    first_name: "fake",
    last_name: "fakest",
    role: "manager",
    password: "$2b$08$DVCvWE8g6dyWgqE2F6pXSu7ihoG6S40n4JujBodZPTEvvd0voLQ92",
  };
  requesterLoginData = {
    email: "fake@gmail.com",
    password: "test1234",
  };
  userLoginData = {
    email: "fake@gmail.com",
    password: "test1234",
  };
  describe("POST /api/signup", () => {
    user = {
      id: 1000,
      email: "fake@gmail.com",
      first_name: "fake",
      last_name: "fakest",
      role: "super-admin",
      password: "$2b$08$DVCvWE8g6dyWgqE2F6pXSu7ihoG6S40n4JujBodZPTEvvd0voLQ92",
    };
    it("It should return 200 status code", (done) => {
      User.create(user);
      chai
        .request(app)
        .post(`/api/user/signup`)
        .send(user)
        .end((error, response) => {
          if (error) return done(error);
          response.should.have.status(200);
          done();
        });
    });
  });

  describe("POST /api/user/login", () => {
    it("It should return 200 status code", (done) => {
      User.create(user);
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
  });

  describe("PUT /api/user/roles/:id", () => {
    it("It should return 200 on user role update to manager", (done) => {
      User.create(user);
      const role = {
        role: "manager",
      };
      chai
        .request(app)
        .put(`/api/user/roles/1000`)
        .set("auth-token", token)
        .send(role)
        .end((error, response) => {
          if (error) return done(error);
          response.should.have.status(200);
          done();
        });
    });
  });
  describe("PUT /api/user/roles/:id", () => {
    it("It should return 200 on user role update to requester", (done) => {
      User.create(user);
      const role = {
        role: "requester",
      };
      chai
        .request(app)
        .put(`/api/user/roles/1000`)
        .set("auth-token", token)
        .send(role)
        .end((error, response) => {
          if (error) return done(error);
          response.should.have.status(200);
          done();
        });
    });

    it("It should return 400 on user role update to manager existing", (done) => {
      User.create(manager);
      const role = {
        role: "manager",
      };
      chai
        .request(app)
        .put(`/api/user/roles/3000`)
        .set("auth-token", token)
        .send(role)
        .end((error, response) => {
          if (error) return done(error);
          response.should.have.status(400);
          response.body.should.have.property("error");
          done();
        });
    });
  });
  describe("PUT /api/user/roles/:id", () => {
    it("It should return 404 on user role update", (done) => {
      User.create(user);
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
  });
  describe("PUT /api/user/roles/:id", () => {
    it("It should return 401 on user role update", (done) => {
      User.create(user);
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
  });

  describe("POST /api/user/login", () => {
    it("It should return 200 status code on logging in requester", (done) => {
      User.create(requester);
      chai
        .request(app)
        .post(`/api/user/login`)
        .send(requesterLoginData)
        .end((error, response) => {
          if (error) return done(error);
          token = response.body.accessToken;
          response.should.have.status(200);
          response.body.should.have.property("accessToken");
          done();
        });
    });

    describe("PUT /api/user/roles/:id", () => {
      it("It should return 403 on user role update to requester since the user is not super admin", (done) => {
        User.create(requester);
        const role = {
          role: "requester",
        };
        chai
          .request(app)
          .put(`/api/user/roles/2000`)
          .set("auth-token", token)
          .send(role)
          .end((error, response) => {
            if (error) return done(error);
            response.should.have.status(403);
            response.body.should.have.property("error", "Not Allowed");
            done();
          });
      });
    });
  });
});
