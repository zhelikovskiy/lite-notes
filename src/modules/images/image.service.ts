import { ImageRepository } from '../../database';
import { Image } from '../../entities/image.entity';
import { Note } from '../../entities/note.entity';
import { User } from '../../entities/user.entity';

const create = async (url: string, user: User, note?: Note): Promise<Image> => {
	try {
		const newImage = new Image();

		newImage.url = url;
		newImage.user = user;

		if (note) {
			newImage.note = note;
		}

		return await ImageRepository.save(newImage);
	} catch (error) {
		console.error('Error creating image: ', error);
		throw new Error('Error creating image');
	}
};

const getOne = async (id: string, user: User): Promise<Image | null> => {
	return await ImageRepository.findOne({
		where: { id, user },
	});
};

export default { create, getOne };
