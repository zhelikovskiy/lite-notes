import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import passportConfig from './configs/password.config';
import swaggerDocument from './configs/swagger.config';
import authRouter from './modules/auth/auth.router';
import userRouter from './modules/users/user.router';
import noteRouter from './modules/notes/note.router';

const app = express();

dotenv.config();
passportConfig();

app.use(cors());
app.use(express.json());

app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/notes', noteRouter);

app.use('/api/uploads', express.static('uploads'));

// const swaggerOptions = {
// 	// ...
// };
// const swaggerSpecs = swaggerJsdoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default app;
