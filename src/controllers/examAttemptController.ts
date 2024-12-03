import { Request, Response } from 'express';
import { AppDataSource } from '../typeorm.config';
import { Exam } from '../entities/Exam';
import { ExamAttempt } from '../entities/ExamAttempt';
import { User } from '../entities/User';

export const startExam = async (req: Request, res: Response) => {
    const examRepository = AppDataSource.getRepository(Exam);
    const userRepository = AppDataSource.getRepository(User);
    const examAttemptRepository = AppDataSource.getRepository(ExamAttempt);

    const { userId } = req.body;
    const { examId } = req.params;

    try {
        const exam = await examRepository.findOne({ where: { id: parseInt(examId) } });
        const user = await userRepository.findOne({ where: { id: parseInt(userId) } });

        if (!exam || !user) {
            return res.status(404).json({ message: 'Exam or User not found' });
        }

        const existingAttempt = await examAttemptRepository.findOne({
            where: { exam: { id: exam.id }, user: { id: user.id } },
        });

        if (existingAttempt) {
            return res.status(400).json({ message: 'User has already started this exam' });
        }

        const attempt = examAttemptRepository.create({ user, exam });
        const savedAttempt = await examAttemptRepository.save(attempt);

        res.status(201).json(savedAttempt);
    } catch (error) {
        res.status(400).json({ message: 'Error starting exam', error });
    }
};
