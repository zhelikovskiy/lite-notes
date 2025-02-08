import express from 'express';
import authController from './auth.controller';

const router = express.Router();

router.post('/register', authController.register as any);
router.post('/login', authController.login as any);

export default router;
