import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Note } from './note.entity';

@Entity()
export class NoteImage {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	url: string;

	@ManyToOne(() => Note, (note) => note.images)
	note: Note;
}
