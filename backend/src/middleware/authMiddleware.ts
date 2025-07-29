import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { NextFunction, Response } from 'express';
import { AuthRequest } from '../types';

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as any;
        req.user = { id: decoded.id, email: decoded.email };
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
};
