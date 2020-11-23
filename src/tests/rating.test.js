/* eslint-disable linebreak-style */
import chai, { expect } from "chai";
import { it, after } from "mocha";
import chaiHttp from "chai-http";
import app from "../index";
import signAccessToken from "../helpers/jwt_helper";
import { Trips, User, Rating } from "../database/models";

chai.use(chaiHttp);

describe(` POST /api/accommodation Rating`, () => {
  const creatRating = {
    service_rate: 1
  };
  const creatRate = {
  };
  const userInfo = {
    id: 5,
    first_name: "alexis",
    last_name: "woking",
    email: "real1@gmail.com",
    role: "requester",
    password: "test1234",
  };
  const admin = {
    first_name: "alexis",
    last_name: "woking",
    email: "real1@gmail.com",
    role: "admin",
    password: "test1234",
  };
  const trip = {
    name: 'john smith',
    requester_id: 5,
    trip_type: 'One-way',
    from: 1,
    to: [2, 1],
    departure_date: new Date(),
    return_date: null,
    reasons: 'H. moon',
    accommodation_id: 5,
    status: 'Approved'
  };
  const trip1 = {
    name: 'john smith',
    requester_id: 5,
    trip_type: 'One-way',
    from: 1,
    to: [2, 1],
    departure_date: new Date(),
    return_date: null,
    reasons: 'H. moon',
    accommodation_id: 5,
    status: 'pending'
  };
  afterEach(async () => {
    await User.destroy({ where: { email: "real1@gmail.com" } });
    await Trips.destroy({ where: { reasons: "H. moon" } });
  });
  after(async () => {
    User.destroy({ where: {} });
    Rating.destroy({ where: {} });
  });
  it("it should creates a rating", async () => {
    const userData = await User.create(userInfo);
    await Trips.create(trip);
    const accessToken = await signAccessToken({ id: userData.id, email: 'real1@gmail.com', role: 'requester' });
    const res = await chai
      .request(app)
      .post(`/api/accommodations/5/rating`)
      .set('auth-token', accessToken)
      .send(creatRating);
    expect(res).to.have.property("status", 200);
  });
  it("it should return 500 if something went wrong", async () => {
    const res = await chai
      .request(app)
      .post(`/api/accommodations/5/rating`)
      .set('auth-token', 'fsjsjkk')
      .send(creatRating);
    expect(res).to.have.property("status", 500);
  });

  it("it should not creates a rating with pending trip", async () => {
    const userData = await User.create(userInfo);
    await Trips.create(trip1);
    const accessToken = await signAccessToken({ id: userData.id, email: 'real1@gmail.com', role: 'requester' });
    const res = await chai
      .request(app)
      .post(`/api/accommodations/5/rating`)
      .set('auth-token', accessToken)
      .send(creatRating)
      .send(creatRating);
    expect(res).to.have.property("status", 404);
  });

  it("it should not creates emppty a rating rating", async () => {
    const userData = await User.create(userInfo);
    await Trips.create(trip);
    const accessToken = await signAccessToken({ id: userData.id, email: 'real1@gmail.com', role: 'requester' });
    const res = await chai
      .request(app)
      .post(`/api/accommodations/5/rating`)
      .set('auth-token', accessToken)
      .send(creatRate);
    expect(res).to.have.property("status", 400);
  });

  it("it not should creates a rating with role not reuqester", async () => {
    const userData = await User.create(admin);
    await Trips.create(trip);
    const accessToken = await signAccessToken({ id: userData.id, email: 'real1@gmail.com' });
    const res = await chai
      .request(app)
      .post(`/api/accommodations/4/rating`)
      .set('auth-token', accessToken)
      .send(creatRating);
    expect(res).to.have.property("status", 403);
  });

  it("it should get all a rating", async () => {
    const userData = await User.create(userInfo);
    const accessToken = await signAccessToken({ id: userData.id, email: 'real1@gmail.com' });
    const res = await chai
      .request(app)
      .get(`/api/accommodations/4/ratings`)
      .set('auth-token', accessToken);
    expect(res).to.have.property("status", 200);
  });

  it("it should not get a rating if you don't provide valid", async () => {
    const userData = await User.create(userInfo);
    const accessToken = await signAccessToken({ id: userData.id, email: 'real1@gmail.com' });
    const res = await chai
      .request(app)
      .get(`/api/accommodations/w/ratings`)
      .set('auth-token', accessToken);
    expect(res).to.have.property("status", 500);
  });

  it("it should not delete a rating for bad request", async () => {
    const userData = await User.create(userInfo);
    const accessToken = await signAccessToken({ id: userData.id, email: 'real1@gmail.com', role: "request" });
    const res = await chai
      .request(app)
      .delete(`/api/accommodations/ratings/1`)
      .set('auth-token', accessToken);
    expect(res).to.have.property("status", 403);
  });
  it("it should 403", async () => {
    const userData = await User.create(userInfo);
    await Trips.create(trip);
    const accessToken = await signAccessToken({ id: userData.id, email: 'real1@gmail.com', role: "request" });
    const res = await chai
      .request(app)
      .delete(`/api/accommodations/ratings/1`)
      .set('auth-token', accessToken);
    expect(res).to.have.property("status", 403);
  });

  it("it should not delete a rating if user is not admin", async () => {
    const userData = await User.create(admin);
    const accessToken = await signAccessToken({ id: userData.id, email: 'real1@gmail.com', role: "admin" });
    const res = await chai
      .request(app)
      .delete(`/api/accommodations/ratings/0`)
      .set('auth-token', accessToken);
    expect(res).to.have.property("status", 404);
  });
});
