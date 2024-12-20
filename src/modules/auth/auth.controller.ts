import { Response, Request, RequestHandler } from 'express';
import userService from '../users/user.service';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const registerDataSchema = z.object({
	email: z.string().email(),
	name: z.string(),
	password: z.string(),
	image: z.string().optional(),
});

const loginDataSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

const register = async (req: Request, res: Response) => {
	try {
		const validatedData = await registerDataSchema.parseAsync(req.body);

		const user = await userService.create(validatedData);

		const token = jwt.sign(
			{ id: user.id },
			process.env.JWT_SECRET || 'secret',
			{
				expiresIn: '1d',
			}
		);

		return res
			.status(201)
			.json({ message: 'User registered successfully', user, token });
	} catch (error: Error | any) {
		console.error('Error during registration:', error);

		if (error instanceof z.ZodError) {
			return res
				.status(400)
				.json({ message: 'Validation error', errors: error.format() });
		}

		return res
			.status(500)
			.json({ message: 'Registration failed', error: error.message });
	}
};

const login = async (req: Request, res: Response) => {
	try {
		const validatedData = await loginDataSchema.parseAsync(req.body);

		const user = await userService.getByEmail(validatedData.email);

		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const isMatch = await bcrypt.compare(
			validatedData.password,
			user.passwordHash
		);

		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign({ id: user.id }, 'your-secret-key', {
			expiresIn: '1h',
		});

		return res.status(200).json({ message: 'Sign in successful', token, user });
	} catch (error: Error | any) {
		console.error('Sign in failed:', error);
		if (error instanceof z.ZodError) {
			return res
				.status(400)
				.json({ message: 'Validation error', errors: error.format() });
		}
		return res
			.status(500)
			.json({ message: 'Sign in failed', error: error.message });
	}
};

export default { register, login };
