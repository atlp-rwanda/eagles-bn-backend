/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */
import '@babel/polyfill';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import path from 'path';
import multipart from 'connect-multiparty';
import swaggerDocument from '../swagger.json';
import { facebookStrategy, googleStrategy } from './config/passport';
import routes from './routes/index';
import chat from './controllers/chat';
import socketAuth from './middlewares/socketio.auth';
import socketHelper from './helpers/socketHelper';
const multipartMiddleware = multipart();

dotenv.config();
const serverPort = process.env.PORT || 5000;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(passport.initialize());
app.use(passport.session());
passport.use(googleStrategy);
passport.use(facebookStrategy);
app.use(multipartMiddleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);
app.get('/chatBot', (req, res) => {
  res.sendFile(`${__dirname}/chatBot.html`);
});

app.get('/notification', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}../../public/notification.html`));
});
io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('notification', (data) => {
    io.emit('notification', data);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
io.use(socketAuth);
chat(io);
socketHelper(io);
export { io };
http.listen(
  serverPort,
  console.log(`Server has started on port ${serverPort}`)
);
export default app;
