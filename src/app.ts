import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import passportConfig from './configs/password.config';
import authRouter from './modules/auth/auth.router';
import userRouter from './modules/users/user.router';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
passportConfig();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.use('/api/uploads', express.static('uploads'));

// const swaggerOptions = {
// 	// ...
// };
// const swaggerSpecs = swaggerJsdoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default app;
