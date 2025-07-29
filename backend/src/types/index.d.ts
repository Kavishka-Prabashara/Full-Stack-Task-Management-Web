import { Request } from 'express';

export interface UserPayload {
    id: number;
    email: string;
}

export interface AuthRequest extends Request {
    user?: UserPayload;
}
