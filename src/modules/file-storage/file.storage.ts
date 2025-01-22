import LocalFileStorage from './local.storage';

export interface FileStorage {
	uploadFile(
		userId: string,
		file: Express.Multer.File,
		subPath?: string
	): Promise<string>;
	getFileUrl(filePath: string): string;
	deleteFile(filePath: string): Promise<void>;
}

export const ImageStorage: FileStorage = new LocalFileStorage();
