// server.ts
import express from 'express';
import cors from './config/cors'; // ✅ use your custom cors config
import { env } from './config/env';

import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();

app.use(cors); // ✅ use custom cors config with origin + credentials
app.use(express.json()); // ✅ allow JSON body parsing

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
});
