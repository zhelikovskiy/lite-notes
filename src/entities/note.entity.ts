import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { NoteImage } from './note-image.entity';

@Entity()
export class Note {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	title: string;

	@Column({ type: 'text' })
	content: string;

	@ManyToOne(() => User, (user) => user.notes)
	user: User;

	@OneToMany(() => NoteImage, (image) => image.note)
	images: NoteImage[];
}
