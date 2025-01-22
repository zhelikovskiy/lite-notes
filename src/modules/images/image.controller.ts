import { Request, Response } from 'express';
import imageService from './image.service';
import { User } from '../../entities/user.entity';
import userService from '../users/user.service';

const uploadImage = async (req: Request, res: Response) => {
	try {
		const file = req.file;
		const { id: userId } = req.user as User;

		const user = await userService.getById(userId);

		if (!user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		if (!file) {
			return res.status(400).json({ message: 'No file provided' });
		}

		const image = await imageService.uploadImage(user, file);

		return res.status(201).json({ message: 'Image uploaded', image });
	} catch (error: Error | any) {
		console.error('ImageController.upload() error:', error);

		return res
			.status(500)
			.json({ message: 'Upload failed', error: error.message });
	}
};

const getUrl = async (req: Request, res: Response) => {
	try {
		const imageId = req.params.id;
		const user = req.user as User;

		if (!user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const image = await imageService.getOneById(imageId, user);

		if (!image) {
			return res.status(404).json({ message: 'Image not found' });
		}

		const imageUrl = await imageService.getImageUrlById(imageId, user);

		return res.status(200).json({ imageUrl });
	} catch (error: Error | any) {
		console.error('ImageController.getUrl() error:', error);

		return res
			.status(500)
			.json({ message: 'Error retrieving image URL', error: error.message });
	}
};

const deleteImage = async (req: Request, res: Response) => {
	try {
		const imageId = req.params.id;
		const user = req.user as User;

		if (!user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		await imageService.deleteOneById(imageId, user);

		return res.status(200).json({ message: 'Image deleted' });
	} catch (error: Error | any) {
		console.error('ImageController.deleteImage() error:', error);

		return res
			.status(500)
			.json({ message: 'Error deleting image', error: error.message });
	}
};

export default { uploadImage, getUrl, deleteImage };
