import { NextFunction, Request, Response } from 'express';
import { UserRoles } from '../entities/user.entity';

const verifyRole = (requiredRoles: UserRoles | UserRoles[] | 'any') => {
	if (requiredRoles == 'any') {
		return (req: Request, res: Response, next: NextFunction) => {
			next();
		};
	}

	return (req: Request, res: Response, next: NextFunction) => {
		const user = req.user as { role: UserRoles };

		if (!user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		if (typeof requiredRoles === 'string') {
			if (user.role !== requiredRoles) {
				return res.status(403).json({ message: 'Forbidden' });
			}
		} else {
			if (!requiredRoles.includes(user.role)) {
				return res.status(403).json({ message: 'Forbidden' });
			}
		}

		next();
	};
};

export default verifyRole;
