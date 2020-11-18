import chai, { expect } from 'chai';
import { it } from 'mocha';
import chaiHTTP from 'chai-http';
import io from 'socket.io-client';
import request from 'request';
import url from 'url';
import app from '../index';
import models from '../database/models';
import signAccessToken from '../helpers/jwt_helper';

const { assert } = chai;
const serverPort = process.env.PORT || 4000;

describe('Chats', () => {
  describe('get chats', () => {
    it('should return 200 Ok', (done) => {
      request.get(`http://localhost:${serverPort}/chatBot`, (err, res) => {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
    // it('Should create a chat', async () => {
    //   const fakeToken = await signAccessToken({
    //     id: 3,
    //     email: 'fake@gmail.com',
    //   });
    //   const fakeChat = { message: 'Hello There!' };

    //   request(app).get('/chatBot').expect('Content-type', /html/).expect(200);
    // });
    it('should return a list, thats not empty', (done) => {
      request.get(`http://localhost:${serverPort}/chatBot`, (err, res) => {
        expect(res.body).length.to.be.greaterThan(0);
        done();
      });
    });
    // it('renders without crashing', () => {
    //   const div = document.createElement('div');
    //   ReactDOM.render(<app />, div);
    // });
    // it('should return a list, thats not empty', (done) => {
    //   io.sockets.emit('newmsg', {
    //     username: user.payload.first_name,
    //     message: data.message,
    //     date: new Date(),
    //   });
    // });
  });
});
