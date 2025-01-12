import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Note } from './note.entity';

export enum UserRoles {
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

	@Column({ type: 'text', enum: UserRoles, default: UserRoles.USER })
	role: UserRoles;

	@Column()
	image: string;

	@OneToMany(() => Note, (note) => note.user)
	notes: Note[];
}
