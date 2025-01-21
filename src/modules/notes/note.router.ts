import express from 'express';
import noteController from './note.controller';
import passport from 'passport';
import verifyRole from '../../middlewares/verify-role.middleware';
import { UserRoles } from '../../entities/user.entity';

const router = express.Router();

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	verifyRole(UserRoles.USER) as any,
	noteController.create as any
);

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	verifyRole(UserRoles.USER) as any,
	noteController.getAll as any
);

export default router;
