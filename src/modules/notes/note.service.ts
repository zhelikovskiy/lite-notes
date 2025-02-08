import { AppDataSource, NoteRepository } from '../../database';
import { In } from 'typeorm';
import { Image } from '../../entities/image.entity';
import { Note } from '../../entities/note.entity';
import CreateNoteDto from './dto/create-note.dto';
import UpdateNoteData from './dto/update-note.dto';
import { User } from '../../entities/user.entity';
import imageService from '../images/image.service';

const create = async (noteData: CreateNoteDto, user: User): Promise<Note> => {
	return await AppDataSource.transaction(async (transactionalEntityManager) => {
		try {
			const { title } = noteData;

			const newNote = new Note();

			newNote.title = title;
			newNote.user = user;

			return await transactionalEntityManager.save(newNote);
		} catch (error) {
			console.error('Error creating note: ', error);
			throw new Error('Error creating note');
		}
	});
};

const update = async (
	noteData: UpdateNoteData,
	noteId: string,
	user: User
): Promise<Note> => {
	return await AppDataSource.transaction(async (transactionalEntityManager) => {
		try {
			const { images, ...data } = noteData;

			const note = await transactionalEntityManager.findOne(Note, {
				where: { id: noteId, user },
				relations: ['images'],
			});

			if (!note) {
				throw new Error('Note not found');
			}

			Object.assign(note, data);

			if (images && images.length > 0) {
				const imageEntities = await transactionalEntityManager.findBy(Image, {
					id: In(images),
				});
				note.images = imageEntities;
			}

			return await NoteRepository.save(note);
		} catch (error) {
			console.error('Error updating note: ', error);
			throw new Error('Error updating note');
		}
	});
};

const getAll = async (user: User): Promise<Note[]> => {
	return await NoteRepository.find({
		where: { user },
		relations: ['images'],
	});
};

const getById = async (id: string, user: User): Promise<Note | null> => {
	return await NoteRepository.findOne({
		where: { id, user },
		relations: ['images'],
	});
};

const deleteOne = async (id: string, user: User): Promise<void> => {
	const note = await NoteRepository.findOne({
		where: { id, user },
		relations: ['images'],
	});

	if (!note) {
		throw new Error('Note not found');
	}

	await AppDataSource.transaction(async (transactionalEntityManager) => {
		await imageService.deleteManyByIds(note.images.map((image) => image.id));
		await transactionalEntityManager.remove(Note, note);
	});
};

export default {
	create,
	update,
	getAll,
	getById,
	deleteOne,
};
