import LocalFileStorage from './local.storage';

export interface FileStorage {
	uploadFile(
		userId: string,
		file: Express.Multer.File,
		subPath?: string
	): Promise<string>;
	getFileUrl(filePath: string): string;
}

export const storage: FileStorage = new LocalFileStorage();
