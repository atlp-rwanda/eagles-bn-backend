import express from 'express';
import dotenv from 'dotenv';
import '@babel/polyfill';
import { json, urlencoded } from "body-parser";
import routes from './routes/index'
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import swaggerDocument from '../swagger.json';
import {
  facebookStrategy,
  googleStrategy,
} from './config/passport';

const serverPort = process.env.PORT || 3000;
dotenv.config();

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
passport.use(googleStrategy);
passport.use(facebookStrategy);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(urlencoded({ extended: false }));
app.use('/api', routes);
app.listen(serverPort, console.log(`Server has started on port ${serverPort}`));
export default app;

