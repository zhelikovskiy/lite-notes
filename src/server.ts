import app from './app';
import { connectToDatabase } from './database';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
	try {
		await connectToDatabase();

		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
			console.log(
				`Swagger UI available at http://localhost:${PORT}/api/swagger`
			);
		});
	} catch (error) {
		console.error('Error starting server:', error);
	}
};

startServer();
