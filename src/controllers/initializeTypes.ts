import { AppDataSource } from '../typeorm.config';
import { TypeOfQuestion } from '../entities/TypeOfQuestion';

export const initializeTypesOfQuestions = async (): Promise<void> => {
    const typeRepository = AppDataSource.getRepository(TypeOfQuestion);

    const types = ['text', 'true_false', 'multiple_choice'];

    try {
        for (const type of types) {
            const existingType = await typeRepository.findOne({ where: { type } });
            if (!existingType) {
                const newType = typeRepository.create({ type });
                await typeRepository.save(newType);
            }
        }
        console.log('Types of questions initialized successfully');
    } catch (error) {
        console.error('Error initializing types of questions:', error);
    }
};
