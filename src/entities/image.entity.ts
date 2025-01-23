import {
	AfterRemove,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Note } from './note.entity';
import { User } from './user.entity';
import { ImageStorage } from '../modules/file-storage/file.storage';
import userService from '../modules/users/user.service';

@Entity()
export class Image {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	url: string;

	@ManyToOne(() => User, (user) => user.images, { onDelete: 'CASCADE' })
	user: User;

	@ManyToOne(() => Note, (note) => note.images, {
		nullable: true,
		onDelete: 'CASCADE',
	})
	note: Note;
}
