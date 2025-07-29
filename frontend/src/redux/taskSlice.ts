import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    dueDate?: string;
    dueTime?: string;
}

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null
};

export const addTask = createAsyncThunk<
    Task,
    { title: string; description?: string; dueDate?: string; dueTime?: string }, // අලුත් properties එකතු කරන්න
    { rejectValue: string }
>(
    'tasks/addTask',
    async ({ title, description, dueDate, dueTime }, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post<Task>(
                '/api/tasks',
                { title, description, dueDate, dueTime }, // ✅ Send all properties
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error: any) {
            console.error('Add task error:', error);
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add task');
        }
    }
);

export const updateTask = createAsyncThunk<Task, Task, { rejectValue: string }>(
    'tasks/updateTask',
    async (task, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put<Task>(
                `/api/tasks/${task.id}`,
                task, // task object එකේ dueDate සහ dueTime අඩංගු විය යුතුයි
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error: any) {
            console.error('Update task error:', error);
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update task');
        }
    }
);

export const deleteTask = createAsyncThunk<string, number, { rejectValue: string }>(
    'tasks/deleteTask',
    async (id, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return String(id);
        } catch (error: any) {
            console.error('Delete task error:', error);
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete task');
        }
    }
);

export const fetchTasks = createAsyncThunk<Task[], void, { rejectValue: string }>(
    'tasks/fetchTasks',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<Task[]>('/api/tasks', {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            console.error('Fetch error:', error);
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch tasks');
        }
    }
);

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Tasks
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to fetch tasks';
            })
            // Add Task
            .addCase(addTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to add task';
            })
            // Update Task
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.loading = false;
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to update task';
            })
            // Delete Task
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.tasks = state.tasks.filter(task => String(task.id) !== action.payload);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to delete task';
            });
    }
});

export default taskSlice.reducer;
