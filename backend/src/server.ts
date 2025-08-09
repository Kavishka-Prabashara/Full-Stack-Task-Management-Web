// server.ts
import express from 'express';
import cors from './config/cors'; //
import { env } from './config/env';

import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();

app.use(cors);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
});
