import { expect } from 'chai';
import { it } from 'mocha';
import io from 'socket.io-client';
import request from 'request';
import models from '../database/models';
import signAccessToken from '../helpers/jwt_helper';

const serverPort = process.env.PORT || 4000;
const password = 'test123';
const email = 'test123';
const mockUser = { first_name: 'john', last_name: 'john', email, password };

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
    it('should connect to io sockets', async () => {
      const user = await models.User.create(mockUser);
      const token = signAccessToken({ id: user.id, email: user.email });
      const client = io({ query: `auth_token=${token}`});
      const data = client.on('connect');
      console.log(data);
      // expect()
    });
  });
});
