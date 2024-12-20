import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
}

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

	@Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
	role: UserRole;

	@Column()
	image: string;
}
