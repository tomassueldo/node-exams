import express from 'express';
import { submitAnswer } from '../controllers/answerController';

const router = express.Router();

router.post('/:questionId/answer', submitAnswer);

export default router;
