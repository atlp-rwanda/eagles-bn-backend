import express from 'express';
import dotenv from 'dotenv';
import { json, urlencoded } from "body-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import routes from './routes/index';

dotenv.config();
const serverPort = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use('/api', routes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(serverPort, console.log(`Server has started on port ${serverPort}`));
export default app;

