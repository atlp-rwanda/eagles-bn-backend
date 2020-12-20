/* eslint-disable linebreak-style */
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
