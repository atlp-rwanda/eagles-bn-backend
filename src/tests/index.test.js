/* eslint-disable linebreak-style */
import { describe } from "mocha";
import oauthTest from "./oauth.test";
import loginTests from "./login.test";
import tripTests from "./trip.test";
import rememberTests from "./remember-travel/remember.test";
import logout from './logout.test';
import accommodationTest from './accommodation/accommodation.test';
import roomTest from './room/room.test';
import userRoles from './roles.test';

describe("Barefoot Nomad: ", () => {
  describe("Trip CRUD: ", tripTests);
  describe("Remember travel: ", rememberTests);
  describe("Email login: ", loginTests);
  describe("User roles: ", userRoles);
  describe("Social login: ", oauthTest);
  describe("Accommodation: ", accommodationTest);
  describe("Room: ", roomTest);
});

// USER LOGOUT TEST SUIT
describe("Logout test suit", () => {
  describe("POST api/user/logout logging out user", logout);
});
