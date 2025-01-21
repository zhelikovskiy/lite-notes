import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Note } from '../entities/note.entity';
import { NoteImage } from '../entities/note-image.entity';

export const AppDataSource = new DataSource({
	type: 'sqlite',
	database: process.env.DB_NAME || 'lite-notes.sqlite',
	entities: [User, Note, NoteImage],
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
