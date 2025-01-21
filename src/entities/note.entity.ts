import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Image } from './image.entity';

@Entity()
export class Note {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	title: string;

	@Column({ type: 'text', nullable: true })
	content: string;

	@ManyToOne(() => User, (user) => user.notes)
	user: User;

	@OneToMany(() => Image, (image) => image.note)
	images: Image[];
}
