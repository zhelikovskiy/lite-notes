import { UserRoles } from '../../../entities/user.entity';
export default interface CreateUserDto {
	email?: string;
	name?: string;
	password?: string;
	image?: string;
}
