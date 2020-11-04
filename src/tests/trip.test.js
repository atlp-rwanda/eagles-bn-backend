import chai, { expect } from "chai";
import { it, after } from "mocha";
import chaiHttp from "chai-http";
import signAccessToken from "../helpers/jwt_helper";
import app from "../index";
import { Trip } from "../database/models";

chai.use(chaiHttp);

export default () => {
  const mockTrip = {
    from: 1,
    to: [2],
    departure_date: "2020-11-02T12:32:53.258Z",
    return_date: "2020-11-12T12:32:53.258Z",
    reasons: "trabajo en el mundo",
    accommodation_id: 1,
    trip_type: "return trip",
  };
  after(async () => {
    await Trip.destroy({ where: mockTrip });
  });
  it("creates a trip", async () => {
    const token = await signAccessToken({ id: 3, email: "fake@gmail.com" });
    const res = await chai
      .request(app)
      .post("/api/trips")
      .set("auth-token", token)
      .send(mockTrip);

    expect(res).to.have.property("status", 201);
  });
  it("fail to create a trip if null 'from' location (validations)", async () => {
    const token = await signAccessToken({ id: 3, email: "fake@gmail.com" });
    const res2 = await chai
      .request(app)
      .post("/api/trips")
      .set("auth-token", token)
      .send({ ...mockTrip, from: null });

    expect(res2).to.have.property("status", 400);
  });
  it("updates a trip", async () => {
    const token = await signAccessToken({ id: 1, email: "fake@gmail.com" });
    const res = await chai
      .request(app)
      .patch("/api/trips/1")
      .set("auth-token", token)
      .send({ from: 4 });

    expect(res).to.have.property("status", 200);
    expect(res.body.data).to.have.property("from", 4);
  });
  it("fail to update a trip on invalid id", async () => {
    const token = await signAccessToken({ id: 1, email: "fake@gmail.com" });
    const res = await chai
      .request(app)
      .patch("/api/trips/0")
      .set("auth-token", token)
      .send({ from: 4 });

    expect(res).to.have.property("status", 404);
  });
  it("fail to update a trip on invalid data", async () => {
    const token = await signAccessToken({ id: 1, email: "fake@gmail.com" });
    const res = await chai
      .request(app)
      .patch("/api/trips/1")
      .set("auth-token", token)
      .send({ from: false });

    expect(res).to.have.property("status", 400);
  });
  it("gets all your trips", async () => {
    const token = await signAccessToken({ id: 1, email: "fake@gmail.com" });
    const res = await chai
      .request(app)
      .get("/api/trips")
      .set("auth-token", token);

    expect(res).to.have.property("status", 200);

    // Must fail because of null id
    const token2 = await signAccessToken({ email: "fake@gmail.com" });
    const res2 = await chai
      .request(app)
      .get("/api/trips")
      .set("auth-token", token2);

    expect(res2).to.have.property("status", 500);
  });
  it("gets your trip", async () => {
    const token = await signAccessToken({ id: 1, email: "fake@gmail.com" });
    const res = await chai
      .request(app)
      .get("/api/trips/1")
      .set("auth-token", token);

    expect(res).to.have.property("status", 200);
  });
  it("fails to get undefined trip", async () => {
    const token = await signAccessToken({ id: 1, email: "fake@gmail.com" });
    const res2 = await chai
      .request(app)
      .get("/api/trips/undefined")
      .set("auth-token", token);

    expect(res2).to.have.property("status", 500);
  });
  it("fails to get a trip on invalid id", async () => {
    const token = await signAccessToken({ id: 1, email: "fake@gmail.com" });
    const res2 = await chai
      .request(app)
      .get("/api/trips/0")
      .set("auth-token", token);

    expect(res2).to.have.property("status", 404);
  });
  it("fails to get a trip if not owner", async () => {
    const token = await signAccessToken({ id: 0, email: "fake@gmail.com" });
    const res2 = await chai
      .request(app)
      .get("/api/trips/1")
      .set("auth-token", token);

    expect(res2).to.have.property("status", 403);
  });
};
