import {AppDataSource} from './typeorm.config';
import express from 'express';
import userRoutes from './routes/userRoutes';
import examRoutes from './routes/examRoutes';
import examAttemptRoutes from './routes/examAttemptRoutes';
import answerRoutes from './routes/answerRoutes';
import {initializeTypesOfQuestions} from "./controllers/initializeTypes";

const app = express();
app.use(express.json());

AppDataSource.initialize()
    .then(async () => {
        console.log('Data Source has been initialized!');
        await initializeTypesOfQuestions();
        app.use('/users', userRoutes);
        app.use('/exams', examRoutes);
        app.use('/exam-attempts', examAttemptRoutes);
        app.use('/answers', answerRoutes);

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });
