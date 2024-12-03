import { Request, Response } from 'express';
import { AppDataSource } from '../typeorm.config';
import { Exam } from '../entities/Exam';
import { Question } from '../entities/Question';

export const createExam = async (req: Request, res: Response) => {
    const examRepository = AppDataSource.getRepository(Exam);
    const questionRepository = AppDataSource.getRepository(Question);

    const { title, questions } = req.body;

    try {
        // Crear y guardar el examen
        const exam = examRepository.create({ title });
        const savedExam = await examRepository.save(exam);

        // Mapear las preguntas y ajustarlas al tipo correcto
        const questionEntities = questions.map((q: any) => ({
            text: q.text,
            type: q.type,
            options: q.options ? JSON.stringify(q.options) : undefined, // Usar `undefined` en lugar de `null`
            exam: savedExam,
        }));

        // Crear y guardar las preguntas
        const savedQuestions = await questionRepository.save(questionEntities);

        res.status(201).json({ exam: savedExam, questions: savedQuestions });
    } catch (error) {
        res.status(400).json({ message: 'Error creating exam', error });
    }
};

export const getExams = async (req: Request, res: Response) => {
    const examRepository = AppDataSource.getRepository(Exam);

    try {
        // Recuperar exámenes con sus preguntas
        const exams = await examRepository.find({ relations: ['questions'] });
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exams', error });
    }
};
