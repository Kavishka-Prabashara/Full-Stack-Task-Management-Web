// src/services/taskService.ts
import { prisma } from '../config/prisma';

export const createTask = async (
    userId: number,
    title: string,
    description?: string,
    dueDate?: string,
    dueTime?: string
) => {
    return prisma.task.create({
        data: {
            title,
            description,
            userId,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            dueTime,
        },
    });
};

export const getUserTasks = async (userId: number) => {
    return prisma.task.findMany({
        where: { userId },
    });
};

// FIX: Reorder parameters - all required first, then all optional
export const updateTask = async (
    taskId: number,
    title: string,
    completed: boolean,     // REQUIRED - moved up
    description?: string,   // OPTIONAL - moved down
    dueDate?: string,
    dueTime?: string
) => {
    return prisma.task.update({
        where: { id: taskId },
        data: {
            title,
            description,
            completed,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            dueTime,
        },
    });
};

export const deleteTask = async (taskId: number) => {
    return prisma.task.delete({
        where: { id: taskId },
    });
};
