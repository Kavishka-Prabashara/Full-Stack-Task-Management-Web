// src/redux/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';


interface User {
    id: number;
    email: string;
    username: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null
};

interface LoginPayload {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: User;
}

// ✅ Correct: Points to backend port 5000
const API_BASE_URL = 'http://localhost:5000';

export const loginUser = createAsyncThunk<
    LoginResponse,
    LoginPayload,
    { rejectValue: string }
>('auth/loginUser', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post<LoginResponse>(
            `${API_BASE_URL}/api/auth/login`,
            credentials
        );
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        return thunkAPI.rejectWithValue(err.response?.data.message || 'Login failed');
    }
});

export const fetchCurrentUser = createAsyncThunk<User, void, { rejectValue: string }>(
    'auth/fetchCurrentUser',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return thunkAPI.rejectWithValue(err.response?.data.message || 'Failed to fetch user');
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Unexpected error';
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
