import {Request, Response} from 'express';
import {AppDataSource} from '../typeorm.config';
import {User} from '../entities/User';

export const createUser = async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(User);
    const {name, email} = req.body;

    try {
        const user = userRepository.create({name, email});
        await userRepository.save(user);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ message: 'Error creating user', error: error.message || error });
    }
};
