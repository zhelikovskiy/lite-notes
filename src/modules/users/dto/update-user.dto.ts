import { Image } from '../../../entities/image.entity';
import { UserRoles } from '../../../entities/user.entity';
export default interface CreateUserDto {
	email?: string;
	name?: string;
	password?: string;
	avatar?: Image | null;
}
