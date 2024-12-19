import { DataSource, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcryptjs';

export class UserService {
	private userRepository: Repository<User>;

	constructor(private dataSource: DataSource) {
		this.userRepository = this.dataSource.getRepository(User);
	}

	async create(userData: any): Promise<User> {
		const { email, name, password, role, image } = userData;

		const existingUser = await this.userRepository.findOne({
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
		newUser.salt = salt;
		newUser.role = role || 'user';
		newUser.image = image || '';

		try {
			return this.userRepository.save(newUser);
		} catch (error) {
			console.error('Error creating user: ', error);
			throw new Error('Error creating user');
		}
	}

	async getAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	async getById(id: string): Promise<User | null> {
		return this.userRepository.findOneBy({ id });
	}

	async getByEmail(email: string): Promise<User | null> {
		return this.userRepository.findOneBy({ email });
	}
}
