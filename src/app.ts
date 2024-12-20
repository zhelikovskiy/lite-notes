import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import passportConfig from './configs/password.config';
import authRouter from './modules/auth/auth.router';
import userRouter from './modules/users/user.router';

const app = express();

passportConfig();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

// const swaggerOptions = {
// 	// ...
// };
// const swaggerSpecs = swaggerJsdoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default app;
