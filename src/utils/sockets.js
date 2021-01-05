import 'dotenv/config';
import sockets from 'socket.io';
import socketAuth from 'socketio-jwt-auth';
import chatControllers from '../controllers/chat';

const { ACCESS_TOKEN_SECRET } = process.env;

const authMiddleware = socketAuth.authenticate(
  { secret: ACCESS_TOKEN_SECRET },
  (payload, done) => done(null, payload)
);

const io = sockets();
const socketFunction = {};
let newClient = null;
socketFunction.socketStartUp = (server) => {
  io.attach(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });
  io.use(authMiddleware);
  io.on('connection', async (client) => {
    console.log('New client successfully connected!');
    newClient = client;
    client.on('disconnect', () => {
      console.log('Bayi bayi ngona!');
    });
  });
};

chatControllers(io);

export default { socketFunction, io, newClient };
