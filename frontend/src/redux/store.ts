// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import taskReducer from './taskSlice'; // optional if not needed now

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: taskReducer, // keep this only if you’re using tasks
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
