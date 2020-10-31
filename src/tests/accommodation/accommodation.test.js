import chai, { expect } from "chai";

import app from "../../index";
import { accommodations } from "./accommodation.data";
import signAccessToken from '../../helpers/jwt_helper';
import models from '../../database/models';
import { fakeCredentials } from '../mock-user.data';

const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const route = "/api/accommodations";
let token;
let accommodationId;
const accommodationTest = () => {
  describe("Accommodation", () => {
    before(async () => {
      const createdUser = await models.User.create(fakeCredentials);
      token = signAccessToken(createdUser.dataValues);
    });
    after(async () => {
      await models.User.destroy({ where: { email: fakeCredentials.email } });
    });
    it("It should create accommodation with valid data", (done) => {
      chai.request(app)
        .post(route)
        .set("auth-token", token)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .field("name", accommodations.valid.name)
        .field("description", accommodations.valid.description)
        .field("lat", accommodations.valid.lat)
        .field("long", accommodations.valid.long)
        .field("location_id", accommodations.valid.location_id)
        .field("services", accommodations.valid.services)
        .field("amenities", accommodations.valid.amenities)
        .attach("images", "public/test_image.png")
        .end((err, res) => {
          accommodationId = res.body.data.id;
          expect(res)
            .to
            .have
            .status(201);
          done();
        });
    })
      .timeout(50000);

    it("It should list accommodations.", (done) => {
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
    it("It should not show single accommodation with invalid ID.", (done) => {
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
    it("It should show single accommodation with valid ID.", (done) => {
      chai.request(app)
        .get(`${route}/${accommodationId}`)
        .end((err, res) => {
          expect(res)
            .to
            .have
            .status(200);
          done();
        });
    });
    it("It should not update single accommodation without token.", (done) => {
      chai.request(app)
        .put(`${route}/${accommodationId}`)
        .send(accommodations.valid)
        .end((err, res) => {
          expect(res)
            .to
            .have
            .status(401);
          done();
        });
    });
    it("It should update single accommodation with valid ID and image", (done) => {
      chai.request(app)
        .put(`${route}/${accommodationId}`)
        .set("auth-token", token)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .field("name", accommodations.valid.name)
        .field("description", accommodations.valid.description)
        .field("lat", accommodations.valid.lat)
        .field("long", accommodations.valid.long)
        .field("location_id", accommodations.valid.location_id)
        .field("services", accommodations.valid.services)
        .field("amenities", accommodations.valid.amenities)
        .attach("images", "public/test_image.png")
        .end((err, res) => {
          expect(res)
            .to
            .have
            .status(200);
          done();
        });
    })
      .timeout(50000);
    it("It should update single accommodation with valid ID", (done) => {
      chai.request(app)
        .put(`${route}/${accommodationId}`)
        .set("auth-token", token)
        .send({
          name: 'Peponi Living',
          description: 'free wifi,gym',
          location_id: 1,
          lat: '41.03495273',
          long: '44.2346987',
          services: ['restaurant'],
          amenities: ['2 star'],
        })
        .end((err, res) => {
          expect(res)
            .to
            .have
            .status(200);
          done();
        });
    })
      .timeout(50000);
    it("It should not create accommodation with no token", (done) => {
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
    it("It should not create accommodation without images", (done) => {
      chai.request(app)
        .post(route)
        .set("auth-token", token)
        .send(accommodations.valid)
        .end((err, res) => {
          expect(res)
            .to
            .have
            .status(400);
          done();
        });
    });
    it("It should not create accommodation with invalid data", (done) => {
      chai.request(app)
        .post(route)
        .send(accommodations.invalid)
        .set("auth-token", token)
        .end((err, res) => {
          expect(res)
            .to
            .have
            .status(400);
          done();
        });
    });

    it("It should not delete accommodation with wrong ID.", (done) => {
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

    it("It should not delete accommodation without token.", (done) => {
      chai.request(app)
        .delete(`${route}/${accommodationId}`)
        .end((err, res) => {
          expect(res)
            .to
            .have
            .status(401);
          done();
        });
    });

    it("It should delete accommodation with valid ID.", (done) => {
      chai.request(app)
        .delete(`${route}/${accommodationId}`)
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
export default accommodationTest;
