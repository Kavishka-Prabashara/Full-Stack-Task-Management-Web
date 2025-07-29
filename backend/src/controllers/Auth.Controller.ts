import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const user = await authService.register(username, email, password);
        res.status(201).json(user);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message }); // << This is your error
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};

export const login = async (req: Request, res: Response) => {
    console.log("Login request body:", req.body); // ✅ Add this

    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.status(200).json(result);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};
