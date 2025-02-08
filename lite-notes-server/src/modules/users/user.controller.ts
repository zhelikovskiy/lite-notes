import { Request, Response } from 'express';
import { z } from 'zod';
import userSerivice from './user.service';
import { User, UserRoles } from '../../entities/user.entity';
import imageService from '../images/image.service';
import { Image } from '../../entities/image.entity';

const createUserDataSchema = z.object({
	email: z.string().email(),
	name: z.string(),
	password: z.string(),
	role: z.enum([UserRoles.ADMIN, UserRoles.USER]),
	avatarId: z.string().optional(),
});

const getUserDataSchema = z.object({
	id: z.string(),
});

const updateUserDataSchema = z.object({
	email: z.string().email().optional(),
	name: z.string().optional(),
	password: z.string().optional(),
	avatar: z.instanceof(Image).nullable().optional(),
});

const create = async (req: Request, res: Response) => {
	try {
		const { body, file } = req;

		const validatedData = await createUserDataSchema.parseAsync(body);

		const user = await userSerivice.create(validatedData);

		if (file) {
			const avatar = await imageService.create(user, file);

			const userWithAvatar = await userSerivice.updateOne(
				{ avatar: avatar },
				user.id
			);

			return res
				.status(201)
				.json({ message: 'User created successfully', userWithAvatar });
		}

		return res.status(201).json({ message: 'User created successfully', user });
	} catch (error: Error | any) {
		console.error('UserController.create() error:', error);

		if (error instanceof z.ZodError) {
			return res
				.status(400)
				.json({ message: 'Validation error', errors: error.format() });
		}

		return res
			.status(500)
			.json({ message: 'Creation failed', error: error.message });
	}
};

const getAll = async (req: Request, res: Response) => {
	try {
		const users = await userSerivice.getAll();

		return res.status(200).json({ users });
	} catch (error: Error | any) {
		console.error('UserController.getAll() error:', error);

		return res
			.status(500)
			.json({ message: 'Error retrieving users', error: error.message });
	}
};

const getOne = async (req: Request, res: Response) => {
	try {
		const { id } = await getUserDataSchema.parseAsync(req.params);

		const user = await userSerivice.getById(id);

		return res.status(200).json({ user });
	} catch (error: Error | any) {
		console.error('UserController.getOne() error:', error);

		if (error instanceof z.ZodError) {
			return res
				.status(400)
				.json({ message: 'Validation error', errors: error.format() });
		}

		return res
			.status(500)
			.json({ message: 'Error retrieving user', error: error.message });
	}
};

const updateOne = async (req: Request, res: Response) => {
	try {
		const { body, file } = req;

		const validatedData = await updateUserDataSchema.parseAsync(body);

		const user = req.user as User;

		if (file) {
			const avatar = await imageService.create(user, file);
			validatedData.avatar = avatar;
		}

		const updatedUser = await userSerivice.updateOne(validatedData, user.id);

		return res.status(200).json({ updatedUser });
	} catch (error: Error | any) {
		console.error('UserController.updateOne() error:', error);

		if (error instanceof z.ZodError) {
			return res
				.status(400)
				.json({ message: 'Validation error', errors: error.format() });
		}

		return res
			.status(500)
			.json({ message: 'Error updating user', error: error.message });
	}
};

const deleteOne = async (req: Request, res: Response) => {
	try {
		const { id } = await getUserDataSchema.parseAsync(req.params);

		const result = await userSerivice.deleteOne(id);

		return res.status(200).json({ result });
	} catch (error: Error | any) {
		console.error('UserController.deleteOne() error:', error);

		if (error instanceof z.ZodError) {
			return res
				.status(400)
				.json({ message: 'Validation error', errors: error.format() });
		}

		return res
			.status(500)
			.json({ message: 'Error deleting user', error: error.message });
	}
};

export default { create, getAll, getOne, updateOne, deleteOne };
