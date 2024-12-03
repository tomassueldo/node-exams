import express from 'express';
import { RequestHandler } from 'express';
import { startExam } from '../controllers/examAttemptController';

const router = express.Router();

router.post('/:examId/start', startExam as RequestHandler);

export default router;
