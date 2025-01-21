import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	OneToOne,
} from 'typeorm';
import { Note } from './note.entity';
import { Image } from './image.entity';

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

	@OneToOne(() => Image, { nullable: true })
	avatar: Image;

	@OneToMany(() => Image, (image) => image.user)
	images: Image[];

	@OneToMany(() => Note, (note) => note.user)
	notes: Note[];
}
