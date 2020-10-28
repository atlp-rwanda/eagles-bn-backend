/* eslint-disable linebreak-style */
import chai, { expect, request } from "chai";
import chaiHttp from "chai-http";
// import request from "supertest";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { where } from "sequelize";
import app from "../index";
import { User as _user } from "../database/models/index";

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
  const fakeToken = jwt.sign(
    {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    },
    process.env.JWT_ACCOUNT_VEIRIFICATION
  );
  describe("/api/signup", () => {
    it("should create a user first and should receive a message", (done) => {
      chai
        .request(app)
        .post("/api/signup")
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
      chai
        .request(app)
        .put(
          `/api/user/email-verification/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiRGF2aWQiLCJsYXN0X25hbWUiOiJVd2F5ZXp1IiwiZW1haWwiOiJkYXZpZHV3YXllenU0MDBAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsImlhdCI6MTYwMzgxNDg3MSwiZXhwIjoxNjA0MDc0MDcxfQ.voriuGGBRuk7J4d29fG-63QVFn8cSOiwlk5AuX7Dh8w`
        )

        .end((err, res) => {
          expect(res).to.have.status(404);
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
