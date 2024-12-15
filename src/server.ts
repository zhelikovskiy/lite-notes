import app from './app';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
	try {
		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
	} catch (error) {
		console.error('Error starting server:', error);
	}
};

startServer();
