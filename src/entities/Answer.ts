import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from './Question';
import { ExamAttempt } from './ExamAttempt';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ExamAttempt, (attempt) => attempt.answers)
  attempt!: ExamAttempt;

  @ManyToOne(() => Question, (question) => question.id)
  question!: Question;

  @Column()
  answer!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
