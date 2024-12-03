import { AppDataSource } from './typeorm.config';
import express from 'express';
import userRoutes from './routes/userRoutes';
import examRoutes from './routes/examRoutes';
import examAttemptRoutes from './routes/examAttemptRoutes';
import answerRoutes from './routes/answerRoutes';

const app = express();
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');

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
