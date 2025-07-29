// src/services/taskService.ts
import { prisma } from '../config/prisma';

export const createTask = async (
    userId: number,
    title: string,
    description?: string,
    dueDate?: string, // Add dueDate
    dueTime?: string    // Add dueTime
) => {
    return prisma.task.create({
        data: {
            title,
            description,
            userId,
            dueDate: dueDate ? new Date(dueDate) : undefined, // Convert string to Date object for Prisma
            dueTime,
        },
    });
};

export const getUserTasks = async (userId: number) => {
    return prisma.task.findMany({
        where: { userId },
    });
};

export const updateTask = async (
    taskId: number,
    title: string,
    description?: string, // Add description for update
    completed: boolean,
    dueDate?: string,    // Add dueDate
    dueTime?: string     // Add dueTime
) => {
    return prisma.task.update({
        where: { id: taskId },
        data: {
            title,
            description, // Update description as well
            completed,
            dueDate: dueDate ? new Date(dueDate) : undefined, // Convert string to Date object
            dueTime,
        },
    });
};

export const deleteTask = async (taskId: number) => {
    return prisma.task.delete({
        where: { id: taskId },
    });
};
