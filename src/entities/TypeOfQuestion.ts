import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from './Question';

@Entity()
export class TypeOfQuestion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    type: string;

    @OneToMany(() => Question, (question) => question.type)
    questions: Question[];
}