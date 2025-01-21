import { Request, Response } from 'express';
import { z } from 'zod';
import noteService from './note.service';
import userService from '../users/user.service';
import { User } from '../../entities/user.entity';
import { use } from 'passport';

const createNoteDataSchema = z.object({
	title: z.string(),
});

const updateNoteDataSchema = z.object({
	title: z.string(),
	content: z.string(),
	images: z.array(z.string()).optional(),
});

const create = async (req: Request, res: Response) => {
	try {
		const validatedData = await createNoteDataSchema.parseAsync(req.body);

		const { id: userId } = req.user as User;

		const user = await userService.getById(userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const note = await noteService.create(validatedData, user);

		return res.status(201).json({ message: 'Note created successfully', note });
	} catch (error: Error | any) {
		console.error('NoteController.create() error:', error);

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
		const { id: userId } = req.user as User;

		const user = await userService.getById(userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const notes = await noteService.getAll(user);

		return res.status(200).json({ notes });
	} catch (error: Error | any) {
		console.error('NoteController.getAll() error:', error);

		return res.status(500).json({ message: 'Error fetching notes' });
	}
};

export default { create, getAll };
