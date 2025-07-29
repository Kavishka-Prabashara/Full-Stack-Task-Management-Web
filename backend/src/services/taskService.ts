import { prisma } from '../config/prisma';

export const createTask = async (userId: number, title: string, description?: string) => {
    return prisma.task.create({
        data: { title, description, userId },
    });
};


export const getUserTasks = async (userId: number) => {
    return prisma.task.findMany({
        where: { userId },
    });
};

export const updateTask = async (taskId: number, title: string, completed: boolean) => {
    return prisma.task.update({
        where: { id: taskId },
        data: { title, completed },
    });
};

export const deleteTask = async (taskId: number) => {
    return prisma.task.delete({
        where: { id: taskId },
    });
};
