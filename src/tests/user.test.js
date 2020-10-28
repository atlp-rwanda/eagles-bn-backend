import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import { User as _user } from "../database/models/index";
import models from "../database/models";
import { describe, it, beforeEach } from "mocha";
chai.use(chaiHttp);
var expect = chai.expect;
var request = chai.request;

describe(" POST /api/users/resetPassword/", () => {
  it("It should change password", (done) => {
    let userData = {
      first_name: "alexis",
      last_name: "work",
      email: "nklbigone@gmail.com",
      password: "alexis123",
    };
    models.User.create(userData)
      .then(() => {
        let password = "alexis4321";
        let email = "nklbigone@gmail.com";
        chai
          .request(app)
          .put(
            "/api/resetPassword/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5rbGJpZ29uZUBnbWFpbC5jb20iLCJpYXQiOjE2MDM3OTk2OTcsImV4cCI6MTYwMzg4NjA5N30.olo518Ek846j-XJsk_YH801HWY_UCKfEWwWWm8klsYc/nklbigone@gmail.com"
          )
          .send({ email, password })
          .end((err, response) => {
            expect(response).to.have.status(404);
            done();
          });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  });
  it("It should not change password if token is invalid", (done) => {
    let userData = {
      first_name: "alexis",
      last_name: "work",
      email: "nklbigone@gmail.com",
      password: "alexis123",
    };
    models.User.create(userData)
      .then(() => {
        let password = "alexis4321";
        chai
          .request(app)
          .put(
            "/api/resetPassword/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5rbGJpZ29uZUBnbWFpbC5jb20iLCJpYXQiOjE2MDM3OTk2OTcsImV4cCI6MTYwMzg4NjA5N30.olo518Ek846j-XJsk_YH801HWY_UCKfEWwWWm8klsYc/nklbigone@gmail.com"
          )
          .send({ password })
          .end((err, response) => {
            expect(response).to.have.status(404);
            done();
          });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  });
});
describe(" POST /api/users/forgetPassword", () => {
  before(async () => {
    await models.User.destroy({ where: { email: "nklbigone@gmail.com" } });
  });
  after(async () => {
    await models.User.destroy({ where: { email: "nklbigone@gmail.com" } });
  });
  it("It should return send email", (done) => {
    let userData = {
      first_name: "alexis",
      last_name: "work",
      email: "nklbigone@gmail.com",
      password: "alexis123",
    };
    models.User.create(userData)
      .then(() => {
        let email = "nklbigone@gmail.com";
        chai
          .request(app)
          .post("/api/forgetPassword")
          .send({ email })
          .end((err, response) => {
            expect(response).to.have.status(201);
            done();
          });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  });

  it("It should not find user", (done) => {
    let email = "gone@gmail.com";
    chai
      .request(app)
      .post("/api/forgetPassword")
      .send({ email })
      .end((err, response) => {
        expect(response).to.have.status(403);
        done();
      });
  });
});

describe("USER SIGNUP TESTS", () => {
  beforeEach((done) => {
    _user.destroy({
      where: {},
      truncate: true,
    });

    _user.create({
      first_name: "Solange",
      last_name: "Iyubu",
      email: "s@ymail.com",
      password: "solasola",
    });
    done();
  });

  describe("POST/signup", () => {
    it("it should signUp a user", (done) => {
      request(app)
        .post("/api/signup")
        .send({
          first_name: "Gahozo",
          last_name: "Ntwari",
          email: "sinang@gmail.com",
          password: "123456789",
          confirmPassword: "123456789",
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res).to.be.json;
          done();
        });
    });
  });

  describe("POST/signup", () => {
    it("it should raise email existance error", (done) => {
      request(app)
        .post("/api/signup")
        .send({
          first_name: "Gahozo",
          last_name: "Ntwari",
          email: "s@ymail.com",
          password: "123456789",
          confirmPassword: "123456789",
        })
        .end((err, res) => {
          console.log(res.body);
          expect(res.status).to.equal(403);
          expect(res).to.be.json;
          expect(res.body).to.be.a("object");
          done();
        });
    });
  });

  describe("POST/signup", () => {
    it("it should raise email format error", (done) => {
      request(app)
        .post("/api/signup")
        .send({
          first_name: "Gahozo",
          last_name: "Ntwari",
          email: "sos@ymail",
          password: "123456789",
          confirmPassword: "123456789",
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property(
            "error",
            '"email" must be a valid email'
          );

          done();
        });
    });
  });

  describe("POST/signup", () => {
    it("it should first_name validation error", (done) => {
      request(app)
        .post("/api/signup")
        .send({
          first_name: "",
          last_name: "Ntwari",
          email: "g@ymail",
          password: "123456789",
          confirmPassword: "123456789",
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property(
            "error",
            '"first_name" is not allowed to be empty'
          );
          done();
        });
    });
  });

  describe("POST/signup", () => {
    it("it should first_name validation error", (done) => {
      request(app)
        .post("/api/signup")
        .send({
          first_name: "Gahozo",
          last_name: "",
          email: "g@ymail",
          password: "123456789",
          confirmPassword: "123456789",
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property(
            "error",
            '"last_name" is not allowed to be empty'
          );
          done();
        });
    });
  });
});
