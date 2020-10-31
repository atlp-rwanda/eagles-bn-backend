import chai, { expect } from 'chai';
import app from '../../index';
// eslint-disable-next-line import/named
import { rooms } from './room.data';
import signAccessToken from '../../helpers/jwt_helper';
import models from '../../database/models';
import { fakeCredentials } from '../mock-user.data';
import { accommodations } from '../accommodation/accommodation.data';

const chaiHttp = require('chai-http');

chai.use(chaiHttp);
let route;
let token;
let roomId;
let accommodationId;
const roomTest = () => {
  describe('Room tests', () => {
    before(async () => {
      const createdUser = await models.User.create(fakeCredentials);
      const createdAccommodation = await models.Accommodation.create({
        name: 'Peponi Living',
        description: 'free wifi,gym',
        location_id: 1,
        images: ['images'],
        lat: '41.03495273',
        long: '44.2346987',
        services: ['restaurant'],
        host_id: 1,
        amenities: ['2 star'],
      });
      accommodationId = createdAccommodation.dataValues.id;
      route = `/api/accommodation/${createdAccommodation.dataValues.id}/rooms`;
      token = signAccessToken(createdUser.dataValues);
    });
    after(async () => {
      await models.User.destroy({ where: { email: fakeCredentials.email } });
      await models.Accommodation.destroy({ where: { id: accommodationId } });
    });
    it('It should create room with valid data', (done) => {
      chai.request(app)
        .post(route)
        .set("auth-token", token)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .field('price', rooms.valid.price)
        .field('details', rooms.valid.details)
        .attach('images', 'public/test_image.png')
        .end((err, res) => {
          roomId = res.body.data.id;
          expect(res)
            .to
            .have
            .status(201);
          done();
        });
    })
      .timeout(50000);

    it('It should list rooms.', (done) => {
      chai.request(app)
        .get(route)
        .set("auth-token", token)
        .end((err, res) => {
          expect(res)
            .to
            .have
            .status(200);
          done();
        });
    });
    it('It should not show single room with invalid ID.', (done) => {
      chai.request(app)
        .get(`${route}/22`)
        .end((err, res) => {
          expect(res)
            .to
            .have
            .status(404);
          done();
        });
    });
    it('It should show single room with valid ID.', (done) => {
      chai.request(app)
        .get(`${route}/${roomId}`)
        .end((err, res) => {
          expect(res)
            .to
            .have
            .status(200);
          done();
        });
    });
    it('It should not update single room without token.', (done) => {
      chai.request(app)
        .put(`${route}/${roomId}`)
        .send(rooms.valid)
        .end((err, res) => {
          expect(res)
            .to
            .have
            .status(401);
          done();
        });
    });

    it('It should update single room with valid ID and image', (done) => {
      chai.request(app)
        .put(`${route}/${roomId}`)
        .set("auth-token", token)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .field('price', rooms.valid.price)
        .field('details', rooms.valid.details)
        .attach('images', 'public/test_image.png')
        .end((err, res) => {
          expect(res)
            .to
            .have
            .status(200);
          done();
        });
    })
      .timeout(50000);

    it('It should update single room with valid ID', (done) => {
      chai.request(app)
        .put(`${route}/${roomId}`)
        .set("auth-token", token)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(rooms.valid)
        .end((err, res) => {
          expect(res)
            .to
            .have
            .status(200);
          done();
        });
    })
      .timeout(50000);
    it('It should not create room with no token', (done) => {
      chai.request(app)
        .post(route)
        .end((err, res) => {
          expect(res)
            .to
            .have
            .status(401);
          done();
        });
    });

    it('It should not create room with invalid data', (done) => {
      chai.request(app)
        .post(route)
        .send(rooms.invalid)
        .set("auth-token", token)
        .end((err, res) => {
          expect(res)
            .to
            .have
            .status(400);
          done();
        });
    });

    it('It should not delete room with wrong ID.', (done) => {
      chai.request(app)
        .delete(`${route}/22`)
        .set("auth-token", token)
        .end((err, res) => {
          expect(res)
            .to
            .have
            .status(404);
          done();
        });
    });

    it('It should not delete room without token.', (done) => {
      chai.request(app)
        .delete(`${route}/${roomId}`)
        .end((err, res) => {
          expect(res)
            .to
            .have
            .status(401);
          done();
        });
    });

    it('It should delete room with valid ID.', (done) => {
      chai.request(app)
        .delete(`${route}/${roomId}`)
        .set("auth-token", token)
        .end((err, res) => {
          expect(res)
            .to
            .have
            .status(200);
          done();
        });
    });
  });
};
export default roomTest;
