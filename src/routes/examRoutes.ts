import express from 'express';
import { createExam, getExams, finishExam, getExamResults } from '../controllers/examController';

const router = express.Router();

router.post('/', createExam);
router.get('/', getExams);
router.post('/:id/finish', finishExam);
router.get('/:id/results', getExamResults);

export default router;
