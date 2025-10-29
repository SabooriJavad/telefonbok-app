import { Router } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user-model.js';
import jwt from 'jsonwebtoken';

export const userRouter = Router();


userRouter.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            
            res.status(400).send('Username,password and email required');
        }
        
        const user = await UserModel.findOne({ $or: [{ username }, { email }] });

        if (user) {
            res.status(400).send('User exists')
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS || '12', 10);

        if (saltRounds < 12) {
            throw new Error('Password must be at least 12 for security reasons');

        }
        const hasedPassword = await bcrypt.hash(password, saltRounds);
        await UserModel.create({ username, email, password: hasedPassword });
        res.status(201).send('User created');

    } catch (err) {
        console.error('Register error', err);
        res.status(500).send('Server error during registeration');
    }
});