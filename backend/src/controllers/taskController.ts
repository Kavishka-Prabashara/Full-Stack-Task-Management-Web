// src/controllers/taskController.ts
import { Request, Response } from 'express';
import * as taskService from '../services/taskService';
import { AuthRequest } from '../types';

// Create Task
export const create = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, dueDate, dueTime } = req.body; // Destructure new fields
        const task = await taskService.createTask(
            req.user!.id,
            title,
            description,
            dueDate, // Pass dueDate
            dueTime  // Pass dueTime
        );
        res.status(201).json(task);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};

// List Tasks (No change needed here as it simply fetches all existing task data)
export const list = async (req: AuthRequest, res: Response) => {
    try {
        const tasks = await taskService.getUserTasks(req.user!.id);
        res.json(tasks);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Update Task
export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, completed, dueDate, dueTime } = req.body;
        const task = await taskService.updateTask(
            Number(id),
            title,
            completed,     // Reordered to match taskService
            description,   // Reordered to match taskService
            dueDate,
            dueTime
        );
        res.json(task);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};

// Delete Task (No change needed)
export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await taskService.deleteTask(Number(id));
        res.json({ message: 'Deleted' });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};
