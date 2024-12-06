// src/entities/Question.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Exam } from './Exam';
import { TypeOfQuestion } from './TypeOfQuestion';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ type: 'text', nullable: true })
    options: string | null;

    @ManyToOne(() => Exam, (exam) => exam.questions)
    exam: Exam;

    @ManyToOne(() => TypeOfQuestion, (type) => type.questions)
    type: TypeOfQuestion;
}
