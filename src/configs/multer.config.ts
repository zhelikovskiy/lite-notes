import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadFolder = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadFolder)) {
	fs.mkdirSync(uploadFolder);
}

type MulterOptions = {
	fieldName?: string;
	allowedTypes?: string[];
	maxSize?: number;
	destination?: string;
};

export const createMulterMiddleware = (options: MulterOptions = {}) => {
	const storage = multer.diskStorage({
		destination: options.destination || uploadFolder,
		filename: (req, file, cb) => {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
			cb(
				null,
				file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
			);
		},
	});

	const fileFilter = (req: any, file: any, cb: any) => {
		const allowedTypes = options.allowedTypes || [
			'image/jpeg',
			'image/png',
			'image/gif',
		];
		if (allowedTypes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(null, false);
		}
	};

	return multer({
		storage,
		fileFilter,
		limits: { fileSize: options.maxSize || 1024 * 1024 * 5 },
	}).single(options.fieldName || 'file');
};
