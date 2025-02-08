import { FileStorage } from './file.storage';
import path from 'path';
import fs from 'fs/promises';
import { constants } from 'fs';

class LocalFileStorage implements FileStorage {
	private readonly uploadFolder: string;

	constructor() {
		this.uploadFolder = path.join(process.cwd(), 'uploads');
		this.ensureDirectoryExists(this.uploadFolder);
	}

	private async ensureDirectoryExists(dirPath: string): Promise<void> {
		try {
			await fs.access(dirPath, constants.F_OK);
		} catch {
			await fs.mkdir(dirPath, { recursive: true });
		}
	}

	async uploadFile(
		userId: string,
		file: Express.Multer.File,
		subPath?: string
	): Promise<string> {
		try {
			const userUploadDir = subPath
				? path.join(this.uploadFolder, userId, subPath)
				: path.join(this.uploadFolder, userId);

			await this.ensureDirectoryExists(userUploadDir);

			const sanitizedFileName = `${Date.now()}-${file.originalname.replace(
				/[^a-zA-Z0-9.\-_]/g,
				''
			)}`;
			const filePathForFS = path.join(userUploadDir, sanitizedFileName);
			const filePathForUrl = path.posix.join(
				userId,
				subPath || '',
				sanitizedFileName
			);

			await fs.writeFile(filePathForFS, file.buffer);

			return filePathForUrl;
		} catch (error) {
			console.error('Error uploading file: ', error);
			throw new Error('File upload failed');
		}
	}

	getFileUrl(filePath: string): string {
		const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
		return `${baseUrl}/api/uploads/${filePath}`;
	}

	async deleteFile(filePath: string): Promise<void> {
		try {
			const fullPath = path.join(this.uploadFolder, filePath);
			await fs.unlink(fullPath);
			console.log(`File deleted: ${fullPath}`);
		} catch (error) {
			console.error(`Error deleting file: ${filePath}`, error);
			throw new Error('File deletion failed');
		}
	}
}

export default LocalFileStorage;
