import { prisma } from '../config/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env'; // ✅ Correct

export const register = async (username: string, email: string, password: string) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { username, email, password: hashed },
    });
    return user;
};


export const login = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
        expiresIn: '1d',
    });

    return { token, user };
};
