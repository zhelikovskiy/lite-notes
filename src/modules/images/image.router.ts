import { Router } from 'express';
import upload from '../../configs/multer.config';
import imageController from './image.controller';
import passport from 'passport';
import { UserRoles } from '../../entities/user.entity';
import verifyRole from '../../middlewares/verify-role.middleware';

const router = Router();

router.post(
	'/',
	upload.single('file'),
	passport.authenticate('jwt', { session: false }),
	verifyRole(UserRoles.USER) as any,
	imageController.uploadImage as any
);
router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	verifyRole(UserRoles.USER) as any,
	imageController.getUrl as any
);

router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	verifyRole(UserRoles.USER) as any,
	imageController.deleteImage as any
);

export default router;
