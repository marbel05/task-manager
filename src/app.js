import express from 'express';
import taskRoutes from './routes/task.routes.js';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    application: 'Task Manager',
  });
});

app.use('/api/tasks', taskRoutes);

export default app;
