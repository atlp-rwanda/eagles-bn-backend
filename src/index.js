import express from 'express';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import swaggerDocument from '../swagger.json';
import authRoutes from './routes/auth';
import {
  facebookStrategy,
  googleStrategy,
} from './config/passport';

const serverPort = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
passport.use(googleStrategy);
passport.use(facebookStrategy);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api/users/', usersRoutes);
app.use('/api', authRoutes);
app.listen(serverPort, console.log(`Server has started on port ${serverPort}`));
export default app;
