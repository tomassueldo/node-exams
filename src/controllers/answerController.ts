import { Request, Response } from 'express';
import { AppDataSource } from '../typeorm.config';
import { Answer } from '../entities/Answer';
import { ExamAttempt } from '../entities/ExamAttempt';
import { Question } from '../entities/Question';

export const submitAnswer = async (req: Request, res: Response): Promise<void> => {
    const answerRepository = AppDataSource.getRepository(Answer);
    const attemptRepository = AppDataSource.getRepository(ExamAttempt);
    const questionRepository = AppDataSource.getRepository(Question);

    const { attemptId, answer } = req.body;
    const { questionId } = req.params;

    try {
        const attempt = await attemptRepository.findOne({ where: { id: parseInt(attemptId) } });
        const question = await questionRepository.findOne({ where: { id: parseInt(questionId) } });

        if (!attempt || !question) {
            res.status(404).json({ message: 'Attempt or Question not found' });
            return;
        }

        const newAnswer = answerRepository.create({
            attempt,
            question,
            answer,
        });

        const savedAnswer = await answerRepository.save(newAnswer);
        res.status(201).json(savedAnswer);
    } catch (error) {
        res.status(400).json({ message: 'Error submitting answer', error });
    }
};
