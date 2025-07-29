import { Request, Response } from 'express';
import * as taskService from '../services/taskService';
import { AuthRequest } from '../types';

// Create Task
export const create = async (req: AuthRequest, res: Response) => {
    try {
        const task = await taskService.createTask(req.user!.id, req.body.title);
        res.status(201).json(task);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};

// List Tasks
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
        const { title, completed } = req.body;
        const task = await taskService.updateTask(Number(id), title, completed);
        res.json(task);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};

// Delete Task
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
