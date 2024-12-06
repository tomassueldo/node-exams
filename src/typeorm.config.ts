import { DataSource } from 'typeorm';
import { Exam } from './entities/Exam';
import { Question } from './entities/Question';
import { Answer } from './entities/Answer';
import { ExamAttempt } from './entities/ExamAttempt';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'exam_api',
  entities: [
    __dirname + '/entities/*.ts'
  ],
  synchronize: true,
  logging: false,
});
