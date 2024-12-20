import { AppDataSource } from '../../database';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UserRoles } from '../../entities/user.entity';
import CreateUserDto from './dto/create-user.dto';

const UserRepository: Repository<User> = AppDataSource.getRepository(User);

const create = async (userData: CreateUserDto): Promise<User> => {
	try {
		const { email, name, password, role, image } = userData;

		const existingUser = await UserRepository.findOne({
			where: { email, name },
		});

		if (existingUser) {
			throw new Error('User with this email or name already exists');
		}

		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);

		const newUser = new User();

		newUser.email = email;
		newUser.name = name;
		newUser.passwordHash = passwordHash;
		newUser.role = role || UserRoles.USER;
		newUser.image = image || '';

		return await UserRepository.save(newUser);
	} catch (error) {
		console.error('Error creating user: ', error);
		throw new Error('Error creating user');
	}
};

const getAll = async (): Promise<User[]> => {
	return await UserRepository.find();
};

const getById = async (id: string): Promise<User | null> => {
	return await UserRepository.findOneBy({ id });
};

const getByEmail = async (email: string): Promise<User | null> => {
	return await UserRepository.findOneBy({ email });
};

const deleteOne = async (id: string): Promise<DeleteResult> => {
	return await UserRepository.delete(id);
};

export default {
	create,
	getAll,
	getById,
	getByEmail,
	deleteOne,
};
