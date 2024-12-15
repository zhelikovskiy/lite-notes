import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import 'reflect-metadata';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// const swaggerOptions = {
// 	// ...
// };
// const swaggerSpecs = swaggerJsdoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default app;
