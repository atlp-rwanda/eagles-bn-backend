import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';


dotenv.config();
const serverPort = process.env.PORT || 4000;

const app = express();
app.use(express.json());

app.use('/api/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(serverPort, console.log(`Server has started on port ${serverPort}`));
export default app;
