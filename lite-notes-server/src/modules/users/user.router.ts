import express from 'express';
import userController from './user.controller';
import passport from 'passport';
import verifyRole from '../../middlewares/verify-role.middleware';
import { UserRoles } from '../../entities/user.entity';
import upload from '../../configs/multer.config';

const router = express.Router();

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	verifyRole(UserRoles.ADMIN) as any,
	upload.single('avatar'),
	userController.create as any
);
router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	userController.getOne as any
);
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	userController.getAll as any
);
router.post(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	upload.single('avatar'),
	userController.updateOne as any
);
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	verifyRole(UserRoles.ADMIN) as any,
	userController.deleteOne as any
);

export default router;
