/* eslint-disable linebreak-style */
import chai, { expect } from "chai";
import { it, after, before } from "mocha";
import chaiHttp from "chai-http";
import signAccessToken from "../helpers/jwt_helper";
import app from "../index";
import { Trips, User, Notification } from "../database/models";
import { fakeRequesterCredentials } from './mock-user.data';
import sendEmail from '../helpers/sendEmail';
import importData from '../helpers/notificationHelper';
import socketIo from '../helpers/socket';

chai.use(chaiHttp);
let token;
const notification = () => {
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
    await Trips.create({
      ...mockTrip, reasons: "Hello", requester_id: user.id
    });
  });
  after(async () => {
    await Trips.destroy({ where: { email: mockTrip.email } });
    await User.destroy({ where: { password: fakeRequesterCredentials.password } });
  });
  let managerToken;
  it('should login before view notification', async () => {
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
    // tripID = res.body.data.id;
    expect(res).to.have.property("status", 201);
  });
  it('should insert notification into notification table', async () => {
    const data = await importData.insertNotification(1, 1, 'This is description');
    expect(data).to.be.a('object');
  });
  it('should send an email to right receipt', async () => {
    await sendEmail('example@gmail.com', 'Elnino', 'http:localhost:5500/api/trips/3/', 'This is notification email');
  });
  // it('should display notification in real time with right receipt via Barefoot Nomad application', async () => {
  //   const res = await socketIo.socket('3', 'notification', 'This is description');
  //   expect(res).to.be.a('object');
  // });
  it('should update notification preferences', (done) => {
    chai
      .request(app)
      .patch('/api/notification/preferences')
      .set('auth-token', token)
      .send({
        notifyByEmail: 'false'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Notification method changed Successfully');
        done();
      });
  });
  it('should return 401 if token is invalid', (done) => {
    chai
      .request(app)
      .patch('/api/notification/preferences')
      .set('auth-token', 'rtyiijjihii')
      .send({
        notifyByEmail: 'false'
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it("It should return unread notifications", async () => {
    const res = await chai
      .request(app)
      .get("/api/notification/unread")
      .set("auth-token", managerToken);

    expect(res).to.have.property("status", 200);
  });

  it("It should return all notifications", async () => {
    const res = await chai
      .request(app)
      .get(`/api/notification/all`)
      .set("auth-token", managerToken);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("message", "Notification fetched successfully");
  });
  it("should retrun 401 if token is invalid", async () => {
    const res = await chai
      .request(app)
      .get(`/api/notification/all`)
      .set('auth-token', '1234rfgkjlfls');
    expect(res).to.have.status(401);
  });
  it("should mark all notifications as read", async () => {
    const res = await chai
      .request(app)
      .put(`/api/notification/readall`)
      .set("auth-token", managerToken)
      .send({ is_read: 'true' });

    expect(res).to.have.property("status", 200);
    expect(res.body).to.have.property("message", "All notificatons marked as read successfully!");
  });
  it("should return 401 if token is invalid", async () => {
    const res = await chai
      .request(app)
      .put(`/api/notification/readall`)
      .set('auth-token', 'wertyhfghfhnf');
    expect(res).to.have.property("status", 401);
  });
  it("It should return 404  if there is no notifications", async () => {
    await Notification.destroy({ where: {} });
    const res = await chai
      .request(app)
      .get(`/api/notification/all`)
      .set("auth-token", token);
    expect(res).to.have.status(404);
  });
  it("It should return 404 if there is no unread notifications", async () => {
    const res = await chai
      .request(app)
      .get("/api/notification/unread")
      .set("auth-token", token)
      .send({ is_read: 'true' });

    expect(res).to.have.status(404);
  });
};
export default notification;
