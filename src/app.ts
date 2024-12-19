import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import passportConfig from './configs/password.config';

const app = express();

passportConfig();

app.use(cors());
app.use(bodyParser.json());

// const swaggerOptions = {
// 	// ...
// };
// const swaggerSpecs = swaggerJsdoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default app;
