/* eslint-disable linebreak-style */
import chai, { expect } from "chai";

import { mock } from "sinon";
import { after, before } from "mocha";
import app from "../index";
import OauthController from "../controllers/oauth.controller";
import cbFunction from "../config/passport";
import oAuth from "../middlewares/auth";
import models from "../database/models";

const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const mockLoginUser = {
  id: 1,
  email: "test@gmail.com",
  password: "a",
};
const oauthTest = () => {
  it("Login with facebook.", (done) => {
    chai
      .request(app)
      .get("/api/user/auth/facebook")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("Login with google.", (done) => {
    chai
      .request(app)
      .get("/api/user/auth/google")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("Login callback", (done) => {
    chai
      .request(app)
      .get("/api/user/auth/google/callback")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("oAuthLogin function", async () => {
    const req = { user: mockLoginUser };
    const res = {
      status: () => ({
        json: () => undefined,
      }),
      send: () => undefined,
    };
    const nextMock = mock();

    await OauthController.loginSuccess(req, res, nextMock);
  });
  describe("Passport", () => {
    before(async () => {
      await models.User.destroy({ where: { email: "fake@gmail.com" } });
    });
    after(async () => {
      await models.User.destroy({ where: { email: "fake@gmail.com" } });
    });
    it("should call done once after find or create user", async () => {
      const doneMock = mock();
      const mockUser = {
        _json: {
          first_name: "Alain",
          last_name: "MUCYO",
          email: "fake@gmail.com",
        },
        provider: "google",
      };

      await cbFunction(null, null, mockUser, doneMock);
    });
    it("should call done once after find or create user (get first and last name)", async () => {
      const doneMock = mock();
      const mockUser = {
        _json: {
          given_name: "Alain",
          family_name: "MUCYO",
          email: "fake@gmail.com",
        },
      };
      await cbFunction(null, null, mockUser, doneMock);
    });
    it("main and callback middlewares", async () => {
      const nextMock = mock();
      const req = { params: { provider: "facebook" } };
      await oAuth.main(req, {}, nextMock);

      const nextMock2 = mock();
      const req2 = { params: { provider: "google" } };

      await oAuth.callback(req2, {}, nextMock2);
    });
  });
};

export default oauthTest;
