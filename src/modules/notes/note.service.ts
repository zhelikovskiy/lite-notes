import { Repository } from 'typeorm';
import { AppDataSource } from '../../database';
import { Note } from '../../entities/note.entity';
import CreateNoteDto from './dto/create-note.dto';
import UpdateNoteData from './dto/update-note.dto';
import { User } from '../../entities/user.entity';

const NoteRepository: Repository<Note> = AppDataSource.getRepository(Note);

const create = async (noteData: CreateNoteDto, user: User): Promise<Note> => {
	try {
		const { title } = noteData;

		const newNote = new Note();

		newNote.title = title;
		newNote.user = user;

		return await NoteRepository.save(newNote);
	} catch (error) {
		console.error('Error creating note: ', error);
		throw new Error('Error creating note');
	}
};

const update = async (noteData: UpdateNoteData, user: User): Promise<Note> => {
	try {
		const { id, ...data } = noteData;

		const note = await NoteRepository.findOne({
			where: { id, user },
		});

		if (!note) {
			throw new Error('Note not found');
		}

		Object.assign(note, data);

		return await NoteRepository.save(note);
	} catch (error) {
		console.error('Error updating note: ', error);
		throw new Error('Error updating note');
	}
};

const getAll = async (user: User): Promise<Note[]> => {
	return await NoteRepository.find({
		where: { user },
	});
};

const getById = async (id: string, user: User): Promise<Note | null> => {
	return await NoteRepository.findOne({
		where: { id, user },
	});
};

const deleteOne = async (id: string, user: User): Promise<void> => {
	await NoteRepository.delete({
		id,
		user,
	});
};

export default {
	create,
	update,
	getAll,
	getById,
	deleteOne,
};
