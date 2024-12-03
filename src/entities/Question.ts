
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Exam } from './Exam';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  options: string;

  @ManyToOne(() => Exam, (exam) => exam.questions)
  exam: Exam;
}
