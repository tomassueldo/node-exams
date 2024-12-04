import {Request, Response} from 'express';
import {AppDataSource} from '../typeorm.config';
import {Exam} from '../entities/Exam';
import {Question} from '../entities/Question';
import {ExamAttempt} from "../entities/ExamAttempt";
import {Answer} from "../entities/Answer";

export const createExam = async (req: Request, res: Response) => {
    const examRepository = AppDataSource.getRepository(Exam);
    const questionRepository = AppDataSource.getRepository(Question);

    const {title, questions} = req.body;

    try {
        const exam = examRepository.create({title});
        const savedExam = await examRepository.save(exam);

        // Mapear las preguntas y ajustarlas al tipo correcto
        const questionEntities = questions.map((q: any) => ({
            text: q.text,
            type: q.type,
            options: q.options ? JSON.stringify(q.options) : undefined,
            exam: savedExam,
        }));

        const savedQuestions = await questionRepository.save(questionEntities);

        res.status(201).json({exam: savedExam, questions: savedQuestions});
    } catch (error) {
        res.status(400).json({message: 'Error creating exam', error});
    }
};

export const getExams = async (req: Request, res: Response) => {
    const examRepository = AppDataSource.getRepository(Exam);

    try {
        // Recuperar exámenes con sus preguntas
        const exams = await examRepository.find({relations: ['questions']});
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({message: 'Error fetching exams', error});
    }
};

export const getExamResults = async (req: Request, res: Response): Promise<void> => {
    const examAttemptRepository = AppDataSource.getRepository(ExamAttempt);

    const {id: examId} = req.params;
    const {userId} = req.query;

    try {
        const attempt = await examAttemptRepository.findOne({
            where: {exam: {id: parseInt(examId)}, user: {id: parseInt(userId as string)}},
            relations: ['answers', 'exam', 'answers.question'],
        });

        if (!attempt) {
            res.status(404).json({message: 'No results found for this exam and user'});
            return;
        }

        res.status(200).json({
            user: attempt.user,
            exam: attempt.exam.title,
            answers: attempt.answers.map((answer) => ({
                question: answer.question.text,
                userAnswer: answer.answer,
            })),
            completed: attempt.completed,
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error:', errorMessage);
        res.status(400).json({message: 'An error occurred', error: errorMessage});
    }

};

export const finishExam = async (req: Request, res: Response): Promise<void> => {
    const examAttemptRepository = AppDataSource.getRepository(ExamAttempt);
    const answerRepository = AppDataSource.getRepository(Answer);

    const {attemptId} = req.body;
    const {id: examId} = req.params;

    try {
        const attempt = await examAttemptRepository.findOne({
            where: {id: parseInt(attemptId), exam: {id: parseInt(examId)}},
            relations: ['answers', 'exam', 'user'],
        });

        if (!attempt) {
            res.status(404).json({message: 'Attempt not found'});
            return;
        }

        const totalQuestions = attempt.exam.questions.length;
        const totalAnswers = attempt.answers.length;

        if (totalAnswers < totalQuestions) {
            res.status(400).json({message: 'Not all questions have been answered'});
            return;
        }

        // Marcar el intento como finalizado
        attempt.completed = true;
        await examAttemptRepository.save(attempt);

        res.status(200).json({message: 'Exam finished successfully', attempt});
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error:', errorMessage);
        res.status(400).json({message: 'An error occurred', error: errorMessage});
    }
};

