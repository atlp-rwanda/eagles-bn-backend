import chai, { expect } from "chai";
import { it, after } from "mocha";
import chaiHTTP from "chai-http";
import app from "../index";
import models from "../database/models";
import signAccessToken from "../helpers/jwt_helper";

let tripId;
let userId;
let token;
let commentId;
let id;
const { User } = models;
chai.should();
chai.use(chaiHTTP);

const cleanAlltables = async () => {
  await User.destroy({ where: {} });
};

describe("Comments and delete", () => {
  before(async () => {
    await cleanAlltables();
  });
  before((done) => {
    const user = {
      first_name: "devu",
      last_name: "Uwayo",
      email: "devuuwayo@barefoot.com",
      password: "12345678",
    };
    chai
      .request(app)
      .post("/api/user/signup")
      .send(user)
      .end((err, response) => {
        token = response.body.token;
        done();
      });
  });

  it("Should post a trip with status code 201", async () => {
    const fakeToken = await signAccessToken({ id: 3, email: "fake@gmail.com" });

    const res = await chai
      .request(app)
      .post("/api/trips")
      .set("auth-token", fakeToken)
      .send({
        from: 4,
        to: [2, 4],
        departure_date: "2020-11-02T12:32:53.258Z",
        return_date: "2020-11-12T12:32:53.258Z",
        reasons: "new office passesgysyu78",
        accommodation_id: 1,
        trip_type: "return trip",
      });

    expect(res).to.have.property("status", 201);
    expect(res).to.be.a("object");
  });
  it("It should return 201 when comment is created", async () => {
    const requestBody = {
      comment: "comment from Requester: testing@gmail.com",
    };
    const fakeToken = await signAccessToken({ id: 3, email: "fake@gmail.com" });
    id = 3;

    const res1 = await chai
      .request(app)
      .post(`/api/trips/${id}/comment`)
      .set("auth-token", fakeToken)
      .send(requestBody);

    // commentId = res.body.saveComment.id;
    // tripId = res.body.saveComment.tripId;
    // console.log(`this is trip id from comments ${tripId}`);
    expect(res1.status).to.be.equal(201);
  });
  it("should return all comments related to that trip", async () => {
    const fakeToken = await signAccessToken({
      id: 3,
      tripId: 3,
      email: "fake@gmail.com",
    });

    const res = await chai
      .request(app)
      .get(`/api/trips/3/comments/3`)
      .set("auth-token", fakeToken);

    res.should.have.status(200);
  });
  it("should return 404 is no data found", async () => {
    const fakeToken = await signAccessToken({ id: 2, email: "fake@gmail.com" });
    id = 4;
    tripId = 6;
    const ress = await chai
      .request(app)
      .get(`/api/trips/${id}/comments/${tripId}`) // user id is not the correct tripId
      .set("auth-token", fakeToken);

    expect(ress).to.have.property("status", 404);
  });
  it("It should return 200 when comment is deleted", async () => {
    const fakeToken = await signAccessToken({ id: 3, email: "fake@gmail.com" });
    commentId = 1;
    tripId = 3;
    const ress1 = await chai
      .request(app)
      .delete(`/api/trips/${tripId}/comments/${commentId}`)
      .set("auth-token", fakeToken);

    expect(ress1.status).to.be.equal(200);
  });
  it("It should return 404 when comment not found to be deleted", async () => {
    const fakeToken = await signAccessToken({
      id: 3,
      email: "fake@gmail.com",
    });
    const ress2 = await chai
      .request(app)
      .delete(`/api/trips/${tripId}/comments${commentId}`)
      .set("auth-token", fakeToken);

    expect(ress2).to.have.property("status", 404);
  });
  it("It should return invalid inputs", async () => {
    const fakeToken = await signAccessToken({
      id: 3,
      email: "fake@gmail.com",
    });

    const requestBody = {
      userId,
      tripId,
      comment: "",
    };
    const ress3 = await chai
      .request(app)
      .post(`/api/trips/${tripId}/comment`)
      .set("auth-token", fakeToken)
      .send(requestBody);

    expect(ress3.status).to.be.equal(400);
  });
  it("It should return not found", async () => {
    const fakeToken = await signAccessToken({
      id: 3,
      email: "fake@gmail.com",
    });
    tripId = 3;
    const ress4 = await chai
      .request(app)
      .get(`/api/trips/${tripId}/comments/0`)
      .set("auth-token", fakeToken);

    expect(ress4.status).to.be.equal(404);
  });
  it("It should return invalid token", async () => {
    id = 3;
    const requestBody = {
      comment: "comment from Manager",
    };
    const ress5 = await chai
      .request(app)
      .post(`/api/trips/${id}/comment`)
      .send(requestBody);

    expect(ress5.status).to.be.equal(401);
  });
});
