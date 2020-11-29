import chai, { expect } from 'chai';
import { it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../index';
import signAccessToken from '../helpers/jwt_helper';
import { Booking, User } from '../database/models';

chai.use(chaiHttp);

const cleanAlltables = async () => {
  await Booking.destroy({ where: {} });
  // await User.destroy({ where: {} });
  await User.destroy({ where: { email: 'nklbigone@gmail.com' } });
};
describe(` POST /api/rooms/1/booking/`, () => {
  const creatBooking = {
    check_in_date: '2021-11-12',
    check_out_date: '2021-11-12',
  };
  const userInfo = {
    first_name: 'alexis',
    last_name: 'work',
    email: 'nklbigone@gmail.com',
    password: 'alexis123',
  };
  beforeEach(async () => {
    await cleanAlltables();
  });
  afterEach(async () => {
    await cleanAlltables();
  });
  it('it should creates a booking', async () => {
    const userData = await User.create(userInfo);
    const accessToken = await signAccessToken({
      id: userData.id,
      email: 'nklbigone@gmail.com',
    });
    const res = await chai
      .request(app)
      .post(`/api/rooms/1/booking/`)
      .set('auth-token', accessToken)
      .send(creatBooking);

    expect(res).to.have.property('status', 200);
  });

  it('it should not creates a booking', async () => {
    const accessToken = await signAccessToken({
      id: 'welcome to my bed',
      email: 'faking',
    });
    const res = await chai
      .request(app)
      .post(`/api/rooms/1/booking/`)
      .set('auth-token', accessToken)
      .send(creatBooking);

    expect(res).to.have.property('status', 500);
  });

  it('it should not creates a booking on wrong date', async () => {
    const accessToken = await signAccessToken({ id: 3, email: 'faking' });
    const res = await chai
      .request(app)
      .post(`/api/rooms/1/booking/`)
      .set('auth-token', accessToken)
      .send({ ...creatBooking, check_in_date: '2020-11-12' });

    expect(res).to.have.property('status', 400);
  });

  it('it should get all a booking', async () => {
    const userData = await User.create(userInfo);
    const accessToken = await signAccessToken({
      id: userData.id,
      email: 'faking',
    });
    const res = await chai
      .request(app)
      .get(`/api/rooms/1/bookings/`)
      .set('auth-token', accessToken);
    expect(res).to.have.property('status', 200);
  });

  it('it should not update a booking if room is not found', async () => {
    const userData = await User.create(userInfo);
    const accessToken = await signAccessToken({
      id: userData.id,
      email: 'faking',
    });
    const res = await chai
      .request(app)
      .patch(`/api/rooms/bookings/33`)
      .set('auth-token', accessToken)
      .send({ creatBooking });
    expect(res).to.have.property('status', 400);
  });

  it('it should not update a booking if booking is not found', async () => {
    const accessToken = await signAccessToken({ id: 11, email: 'faking' });
    const res = await chai
      .request(app)
      .patch(`/api/rooms/bookings/`)
      .set('auth-token', accessToken)
      .send(creatBooking);
    expect(res).to.have.property('status', 404);
  });

  it('it should update a booking', async () => {
    const userData = await User.create(userInfo);
    const bookingKing = await Booking.create({
      ...creatBooking,
      user_id: userData.id,
      room_id: 1,
    });
    const accessToken = await signAccessToken({
      id: userData.id,
      email: 'faking',
    });
    const res = await chai
      .request(app)
      .patch(`/api/rooms/bookings/${bookingKing.dataValues.id}`)
      .set('auth-token', accessToken)
      .send(creatBooking);

    expect(res).to.have.property('status', 201);
  });

  it('it should not update a booking on invalid user id', async () => {
    const accessToken = await signAccessToken({
      id: 'invalid',
      email: 'faking',
    });
    const res = await chai
      .request(app)
      .patch(`/api/rooms/bookings/100000000`)
      .set('auth-token', accessToken)
      .send(creatBooking);

    expect(res).to.have.property('status', 500);
  });

  it('it should not update a booking on not found booking id', async () => {
    const userData = await User.create(userInfo);
    const accessToken = await signAccessToken({
      id: userData.id,
      email: 'faking',
    });
    const res = await chai
      .request(app)
      .patch(`/api/rooms/bookings/100000000`)
      .set('auth-token', accessToken)
      .send(creatBooking);

    expect(res).to.have.property('status', 404);
  });

  it('it should not update a booking', async () => {
    const userData = await User.create(userInfo);
    const bookingKing = await Booking.create({
      ...creatBooking,
      user_id: userData.id,
      room_id: 1,
    });
    const accessToken = await signAccessToken({
      id: userData.id,
      email: 'faking',
    });
    const res = await chai
      .request(app)
      .patch(`/api/rooms/bookings/${bookingKing.dataValues.id}`)
      .set('auth-token', accessToken)
      .send({ ...creatBooking, check_in_date: 'fake date' });
    expect(res).to.have.property('status', 400);
  });

  it('it should not delete a booking if booking is not found', async () => {
    const userData = await User.create(userInfo);
    const accessToken = await signAccessToken({
      id: userData.id,
      email: 'faking',
    });
    const res = await chai
      .request(app)
      .delete(`/api/rooms/booking/90`)
      .set('auth-token', accessToken);
    expect(res).to.have.property('status', 400);
  });

  it('it should delete a booking ', async () => {
    const userData = await User.create(userInfo);
    const bookingKing = await Booking.create({
      ...creatBooking,
      user_id: userData.id,
      room_id: 1,
    });
    const accessToken = await signAccessToken({
      id: userData.id,
      email: 'faking',
    });
    const res = await chai
      .request(app)
      .delete(`/api/rooms/booking/${bookingKing.id}`)
      .set('auth-token', accessToken);
    expect(res).to.have.property('status', 200);
  });
});
