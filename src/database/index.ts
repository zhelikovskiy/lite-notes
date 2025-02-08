import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Note } from '../entities/note.entity';
import { Image } from '../entities/image.entity';

export const AppDataSource = new DataSource({
	type: 'sqlite',
	database: process.env.DB_NAME || 'lite-notes.sqlite',
	entities: [User, Note, Image],
	synchronize: true,
	logging: false,
});

export const connectToDatabase = async () => {
	try {
		await AppDataSource.initialize();

		console.log('Successfully connected to SQLite database!');

		return AppDataSource;
	} catch (error) {
		console.error('Error connecting to SQLite database:', error);

		process.exit(1);
	}
};

export const UserRepository: Repository<User> =
	AppDataSource.getRepository(User);

export const NoteRepository: Repository<Note> =
	AppDataSource.getRepository(Note);

export const ImageRepository: Repository<Image> =
	AppDataSource.getRepository(Image);
