import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Exam } from './Exam';
import { Answer } from './Answer';

@Entity()
export class ExamAttempt {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.id)
  user!: User;

  @ManyToOne(() => Exam, (exam) => exam.id)
  exam!: Exam;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  startTime!: Date;

  @OneToMany(() => Answer, (answer) => answer.attempt, { cascade: true })
  answers!: Answer[];
}
