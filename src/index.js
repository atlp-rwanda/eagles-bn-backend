import 'dotenv/config';
import '@babel/polyfill';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import http from 'http';
import path from 'path';
import cors from 'cors';
import multipart from 'connect-multiparty';
import swaggerDocument from '../swagger.json';
import { facebookStrategy, googleStrategy } from './config/passport';
import './utils/EventEmitters/index';
import routes from './routes/index';
import inAppNotifier from './utils/notifications';
import socket from './utils/sockets';
import chat from './controllers/chat';
import socketAuth from './middlewares/socketio.auth';
import socketHelper from './helpers/socketHelper';
import Location from './controllers/accomodation';
const multipartMiddleware = multipart();

const serverPort = process.env.PORT;
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(multipart());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(passport.initialize());
app.use(passport.session());
passport.use(googleStrategy);
passport.use(facebookStrategy);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);
app.get('/chatBot', (req, res) => {
  res.sendFile(`${__dirname}/chatBot.html`);
});

inAppNotifier();
socket.socketFunction.socketStartUp(server);
app.get('/notification', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}../../public/notification.html`));
});
app.get('/api/locations', Location.getLocation);
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
