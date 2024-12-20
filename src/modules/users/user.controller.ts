import { Request, Response } from 'express';
import { z } from 'zod';
import userSerivice from './user.service';
import { UserRoles } from '../../entities/user.entity';

const createUserDataSchema = z.object({
	email: z.string().email(),
	name: z.string(),
	password: z.string(),
	role: z.enum([UserRoles.ADMIN, UserRoles.USER]),
	image: z.string().optional(),
});

const getUserDataSchema = z.object({
	id: z.string(),
});

const create = async (req: Request, res: Response) => {
	try {
		const validatedData = await createUserDataSchema.parseAsync(req.body);

		const user = await userSerivice.create(validatedData);

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

		console.log(req.params);

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

export default { create, getAll, getOne, deleteOne };
