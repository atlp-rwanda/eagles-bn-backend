/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
import { describe, it, beforeEach, afterEach } from "mocha";
import chaiHTTP from "chai-http";
import chai, { expect } from "chai";
import app from "../index";
import { User } from "../database/models";

chai.use(chaiHTTP);

export default () => {
  describe("POST /api/user/login: ", () => {
    beforeEach(async () => {
      await User.destroy({ where: { email: "fake@gmail.com" } });
    });

    afterEach(async () => {
      await User.destroy({ where: { email: "fake@gmail.com" } });
    });

    const fakeUser = {
      email: "fake@gmail.com",
      first_name: "fake",
      last_name: "fakest",
      password: "$2b$08$DVCvWE8g6dyWgqE2F6pXSu7ihoG6S40n4JujBodZPTEvvd0voLQ92",
    };
    const fakeCredentials = {
      email: "fake@gmail.com",
      password: "test1234",
    };

    it("should fail to login on false/no email", async () => {
      await User.create(fakeUser);

      const res = await chai
        .request(app)
        .post("/api/user/login")
        .send({ ...fakeCredentials, email: "notfake@gmail.com" });

      expect(res).to.have.property("status", 404);
      expect(res).to.have.property("body");
      expect(res.body).to.have.property("error", "Invalid Email or Password");
    });
    it("should fail to login on false password", async () => {
      await User.create(fakeUser);

      const res = await chai
        .request(app)
        .post("/api/user/login")
        .send({ ...fakeCredentials, password: "not fake at all" });

      expect(res).to.have.property("status", 401);
      expect(res).to.have.property("body");
      expect(res.body).to.have.property("error", "Incorrect email or password");
    });
    it("should apply login", async () => {
      await User.create(fakeUser);

      const res = await chai
        .request(app)
        .post("/api/user/login")
        .send(fakeCredentials);

      expect(res).to.have.property("status", 200);
      expect(res).to.have.property("body");
      expect(res.body).to.have.property(
        "message",
        "User Logged in successfully"
      );
    });
  });
  describe("Check auth: ", () => {
    it("should return 401 status on no token", async () => {
      const res = await chai
        .request(app)
        .get("/api/user/test-auth")
        .set("authorization", "no token");

      expect(res).to.have.property("status", 401);
    });
  });
};
