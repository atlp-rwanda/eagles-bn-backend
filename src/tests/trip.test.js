/* eslint-disable linebreak-style */
import chai, { expect } from "chai";
import { it, after, before } from "mocha";
import chaiHttp from "chai-http";
import signAccessToken from "../helpers/jwt_helper";
import app from "../index";
import { Trips, User } from "../database/models";
import { fakeRequesterCredentials, fakeManagerCredentials } from './mock-user.data';

chai.use(chaiHttp);
let token;
let tripID;
let managerToken;
let rememberOffToken;
export default () => {
  const mockTrip = {
    from: 1,
    to: [2],
    departure_date: "2020-11-02T12:32:53.258Z",
    return_date: "2020-11-12T12:32:53.258Z",
    reasons: "trabajo en el mundogjyjb6ts",
    accommodation_id: 1,
    trip_type: "return trip",
    name: "Alain",
    email: "alainmucyo3@gmail.com",
    passport: "1233333",
    id_number: "22222222",
    phone: "+2507888888",
    gender: "Male",
    marital_status: "Single"
  };
  before(async () => {
    await Trips.destroy({ where: { email: mockTrip.email } });
    await User.destroy({ where: { password: fakeRequesterCredentials.password } });
    const { dataValues: user } = await User.create(fakeRequesterCredentials);
    token = await signAccessToken(user);
    const { dataValues: manager } = await User.create(fakeManagerCredentials);
    managerToken = await signAccessToken(manager);
    const { dataValues: rememberUser } = await User.create({ ...fakeRequesterCredentials, email: "alainmucyo@gmail.com", remember_travel: false });
    rememberOffToken = await signAccessToken(rememberUser);
    await Trips.create({ ...mockTrip, reasons: "Hello", requester_id: user.id });
  });
  after(async () => {
    await Trips.destroy({ where: { email: mockTrip.email } });
    await User.destroy({ where: { password: fakeRequesterCredentials.password } });
  });
  let managerToken;
  it('should login before retrieve all trips', async () => {
    const admin = {
      email: "eagleManager@eagles.com",
      password: "SuperAdmin@eagles",
    };
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send(admin);
    managerToken = res.body.accessToken;
    expect(res).to.have.status(200);
  });
  it("creates a trip", async () => {
    const res = await chai
      .request(app)
      .post("/api/trips")
      .set("auth-token", token)
      .send(mockTrip);
    tripID = res.body.data.id;
    expect(res).to.have.property("status", 201);
  });
  it("fail to create a trip if null 'from' location (validations)", async () => {
    const res2 = await chai
      .request(app)
      .post("/api/trips")
      .set("auth-token", token)
      .send({ ...mockTrip, from: null });

    expect(res2).to.have.property("status", 400);
  });
  it("updates a trip", async () => {
    const res = await chai
      .request(app)
      .patch(`/api/trips/${tripID}`)
      .set("auth-token", token)
      .send({ from: 4 });

    expect(res).to.have.property("status", 200);
    expect(res.body.data).to.have.property("from", 4);
  });
  it("updates a trip status", async () => {
    const res = await chai
      .request(app)
      .patch(`/api/trips/${tripID}/status`)
      .set("auth-token", managerToken)
      .send({ status: 'approved' });
      
    expect(res).to.have.property("status", 200);
  });
  it("fails to update a trip status on validation error", async () => {
    const res = await chai
      .request(app)
      .patch(`/api/trips/${tripID}/status`)
      .set("auth-token", managerToken)
      .send({ status: 'exit' });
      
    expect(res).to.have.property("status", 400);
  });
  it("fail to update a trip on invalid id", async () => {
    const res = await chai
      .request(app)
      .patch("/api/trips/0")
      .set("auth-token", token)
      .send({ from: 4 });

    expect(res).to.have.property("status", 404);
  });
  it("fail to update a trip on invalid data", async () => {
    const res = await chai
      .request(app)
      .patch(`/api/trips/${tripID}`)
      .set("auth-token", token)
      .send({ from: false });

    expect(res).to.have.property("status", 400);
  });
  it("gets all your trips", async () => {
    const res = await chai
      .request(app)
      .get("/api/trips")
      .set("auth-token", managerToken);

    expect(res).to.have.property("status", 200);

    // Must fail because of null id
    // const token2 = await signAccessToken({ email: "fake@gmail.com" });
    // const res2 = await chai
    //   .request(app)
    //   .get("/api/trips")
    //   .set("auth-token", token2);

    // expect(res2).to.have.property("status", 500);
  });
  it("gets your trip", async () => {
    const res = await chai
      .request(app)
      .get(`/api/trips/${tripID}`)
      .set("auth-token", token);

    expect(res).to.have.property("status", 200);
  });
  it('search through your trips', async () => {
    const res = await chai
      .request(app)
      .get('/api/trips/search?from=1&status=way')
      .set('auth-token', token);
    expect(res).to.have.property('status', 200);
  });
  it('fail to search through your trips on fake query', async () => {
    const token2 = await signAccessToken({ id: 3, email: 'fake@gmail.com' });
    const res2 = await chai
      .request(app)
      .get('/api/trips/search?manager_id=3')
      .set('auth-token', token2);

    expect(res2).to.have.property('status', 400);
  });
  it("gets latest remember trip", async () => {
    const res = await chai
      .request(app)
      .get(`/api/trips/remember/latest`)
      .set("auth-token", token);

    expect(res).to.have.property("status", 200);
  });
  it("fail to get latest remember trip when remember is off", async () => {
    const res = await chai
      .request(app)
      .get(`/api/trips/remember/latest`)
      .set("auth-token", rememberOffToken);

    expect(res).to.have.property("status", 400);
  });
  it("fails to get undefined trip", async () => {
    const res2 = await chai
      .request(app)
      .get("/api/trips/undefined")
      .set("auth-token", token);

    expect(res2).to.have.property("status", 500);
  });
  it("fails to get a trip on invalid id", async () => {
    const res2 = await chai
      .request(app)
      .get("/api/trips/0")
      .set("auth-token", token);

    expect(res2).to.have.property("status", 404);
  });
  it("fails to get a trip if not owner", async () => {
    const token2 = await signAccessToken({ id: 11111, email: "hello@gmail.com" });
    const res2 = await chai
      .request(app)
      .get(`/api/trips/${tripID}`)
      .set("auth-token", token2);

    expect(res2).to.have.property("status", 403);
  });
};
