import { ImageRepository } from '../../database';
import { Image } from '../../entities/image.entity';
import { Note } from '../../entities/note.entity';
import { User } from '../../entities/user.entity';
import { ImageStorage } from '../file-storage/file.storage';

const uploadImage = async (
	user: User,
	file: Express.Multer.File
): Promise<Image> => {
	const filePath = await ImageStorage.uploadFile(user.id, file);

	const image = new Image();
	image.url = filePath; // Сохраняем относительный путь
	image.user = user;

	return await ImageRepository.save(image);
};

const getOneById = async (id: string, user: User): Promise<Image | null> => {
	return await ImageRepository.findOne({
		where: { id, user },
	});
};

const getImageUrlById = async (id: string, user: User): Promise<string> => {
	const image = await getOneById(id, user);

	if (!image) {
		throw new Error('Image not found');
	}

	return ImageStorage.getFileUrl(image.url); // Передаем относительный путь
};

const deleteOneById = async (id: string, user: User): Promise<void> => {
	const image = await ImageRepository.findOne({
		where: { id, user },
	});

	if (!image) {
		throw new Error('Image not found');
	}

	await ImageStorage.deleteFile(image.url); // Передаем относительный путь

	await ImageRepository.remove(image);
};

export default { uploadImage, getOneById, deleteOneById, getImageUrlById };
