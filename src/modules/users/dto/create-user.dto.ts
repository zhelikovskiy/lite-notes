import { UserRole } from '../../../entities/user.entity';
export default interface CreateUserDto {
	email: string;
	name: string;
	password: string;
	role?: UserRole;
	image?: string;
}
