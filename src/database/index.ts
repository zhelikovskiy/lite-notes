import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
	type: 'sqlite',
	database: process.env.DB_NAME || 'lite-notes.sqlite',
	entities: [__dirname + '/../**/*.entity.{ts,js}'],
	synchronize: false,
	logging: process.env.NODE_ENV !== 'production',
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
