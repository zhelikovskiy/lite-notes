import { In } from 'typeorm';
import { AppDataSource, ImageRepository } from '../../database';
import { Image } from '../../entities/image.entity';
import { Note } from '../../entities/note.entity';
import { User } from '../../entities/user.entity';
import { ImageStorage } from '../file-storage/file.storage';

const create = async (
	user: User,
	file: Express.Multer.File
): Promise<Image> => {
	const filePath = await ImageStorage.uploadFile(user.id, file);

	const image = new Image();
	image.url = filePath;
	image.user = user;

	return await ImageRepository.save(image);
};

const getAll = async (): Promise<Image[]> => {
	return await ImageRepository.find();
};

const getOneById = async (id: string): Promise<Image | null> => {
	return await ImageRepository.findOne({
		where: { id },
	});
};

const getImageUrlById = async (id: string): Promise<string> => {
	const image = await getOneById(id);

	if (!image) {
		throw new Error('Image not found');
	}

	return ImageStorage.getFileUrl(image.url); // Передаем относительный путь
};

const deleteOneById = async (id: string): Promise<void> => {
	const image = await ImageRepository.findOne({
		where: { id },
	});

	if (!image) {
		throw new Error('Image not found');
	}

	await AppDataSource.transaction(async (transactionalEntityManager) => {
		await transactionalEntityManager.remove(image);
		await ImageStorage.deleteFile(image.url);
	});
};

const deleteManyByIds = async (ids: string[]): Promise<void> => {
	const images = await ImageRepository.findBy({ id: In(ids) });

	await AppDataSource.transaction(async (transactionalEntityManager) => {
		for (const image of images) {
			await transactionalEntityManager.remove(image);
			await ImageStorage.deleteFile(image.url);
		}
	});
};

export default {
	create,
	getAll,
	getOneById,
	deleteOneById,
	getImageUrlById,
	deleteManyByIds,
};
