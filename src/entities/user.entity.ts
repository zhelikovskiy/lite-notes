import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	email: string;

	@Column({ unique: true })
	name: string;

	@Column()
	passwordHash: string;

	@Column()
	salt: string;

	@Column()
	role: string;

	@Column()
	image: string;
}
