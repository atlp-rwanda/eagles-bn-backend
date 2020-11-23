/* eslint-disable linebreak-style */
import chai, { expect } from 'chai';
import { it } from 'mocha';

import { createChat, getTheChats } from '../controllers/chat';

describe('function test suit', () => {
  it('should return object', () => {
    createChat('gibe', 'chat created');
  });
  it('should return object', () => {
    getTheChats();
  });
});
