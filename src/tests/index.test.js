import { oauthTest } from "./oauth.test";
import loginTests from "./login.test";

describe("Barefoot Nomad: ", () => {
  describe("Email login: ", loginTests);
  describe("Social login: ", oauthTest);
});
