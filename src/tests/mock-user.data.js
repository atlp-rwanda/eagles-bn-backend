// eslint-disable-next-line import/prefer-default-export
import { roles } from '../helpers/roles';

export const fakeCredentials = {
  first_name: "Fake",
  last_name: "User",
  email: "fake@gmail.com",
  role: roles.ADMIN,
  password: "test1234",
};
export const fakeManagerCredentials = {
  first_name: "Fake",
  last_name: "User",
  email: "fake@gmail.com",
  role: roles.MANAGER,
  manager: 3,
  password: "test1234",
};
export const fakeRequesterCredentials = {
  first_name: "Fake",
  last_name: "User",
  email: "fakerequester@gmail.com",
  role: roles.REQUESTER,
  password: "test1234",
  confirmPassword: 'test1234',
  manager: 3,
  remember_travel: true,
  notifyByEmail: true
};
