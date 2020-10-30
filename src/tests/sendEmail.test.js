/* eslint-disable linebreak-style */
import chai, { expect} from "chai";
import chaiHttp from "chai-http";
// import request from "supertest";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import app from "../index";
import { signToken } from "../helpers/auth";

dotenv.config();

chai.should();
chai.use(chaiHttp);

describe("/api/", () => {
  const user = {
    first_name: "David",
    last_name: "Uwayezu",
    email: "uwayezudavid96@gmail.com",
    password: "12345678",
    confirmPassword: "12345678",
    isConfirmed: false,
  };
  jwt.sign(
    {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    },
    process.env.JWT_ACCOUNT_VEIRIFICATION
  );
  describe("/api/user/signup", () => {
    it("should create a user first and should receive a message", (done) => {
      chai
        .request(app)
        .post("/api/user/signup")
        .send({
          first_name: "David",
          last_name: "Uwayezu",
          email: "uwayezudavid96@gmail.com",
          password: "12345678",
          confirmPassword: "12345678",
          isConfirmed: false,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("object");
          expect(res).to.be.json;
          done();
        });
    });
  });

  describe("PUT /api/user/email-verification/:token", () => {
    it("should return 404 not found error when account is not found", (done) => {
      const user = {
        first_name: "David",
        last_name: "Uwayezu",
        email: "uwayezudavid96@gmail.com",
        password: "12345678",
        confirmPassword: "12345678",
        isConfirmed: false,
      };
      const token = signToken(
        { email: "non existent" },
        process.env.JWT_ACCOUNT_VEIRIFICATION
      );
      chai
        .request(app)
        .put(`/api/user/email-verification/${token}`)

        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.a("object");

          done();
        });
    });
    it("should return 500 internal server error when fake secret", (done) => {
      const token = signToken({ email: "non existent" }, "fake secret");
      chai
        .request(app)
        .put(`/api/user/email-verification/${token}`)

        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.be.a("object");

          done();
        });
    });

    it("should not confirm due  to , invalid PATH", (done) => {
      chai
        .request(app)
        .put("/api/user/email-verification/here")
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          done();
        });
    });
    it("should return 400 error  if it not token provided", (done) => {
      chai
        .request(app)
        .put(
          `/api/user/email-verification/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJmaXJzdF09099uYW1lIjoidGV0YSIsImxhc3RfbmFtZSI6ImxhZXRpdGlhIiwiZW1haWwiOiJ1d2F5ZXp1ZGF2aWQ5NkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQ1Njc4IiwiaWF0IjoxNjAzNzk5MzYwLCJleHAiOjE2MDQwNTg1NjB9.NiCZZpIGBB6bzt8pD_bkUS01IoP-WVxDWh0xgTDdNzQ`
        )
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          done();
        });
    });
  });
});
