import { DataSource } from 'typeorm';
import { Exam } from './entities/Exam';
import { Question } from './entities/Question';
import { Answer } from './entities/Answer';
import { ExamAttempt } from './entities/ExamAttempt';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './data/app.db',
  entities: [Exam, Question, Answer, ExamAttempt, User],
  synchronize: true,
  logging: true,
});
