/* eslint-disable linebreak-style */
import { describe } from 'mocha';
import oauthTest from './oauth.test';
import loginTests from "./login.test";
import logout from './logout.test';

describe("Barefoot Nomad: ", () => {
  describe("Email login: ", loginTests);
  describe("Social login: ", oauthTest);
});

// USER LOGOUT TEST SUIT

describe('Logout test suit', () => {
  describe('POST api/user/logout logging out user', logout);
});
