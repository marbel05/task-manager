import request from 'supertest';
import { afterEach, describe, expect, test } from '@jest/globals';
import app from '../../src/app.js';
import db from '../../src/config/database.js';

afterEach(() => {
  db.prepare('DELETE FROM tasks').run();
});

describe('Tasks API', () => {
  test('creates a task', async () => {
    const response = await request(app).post('/api/tasks').send({
      title: 'Test task',
      description: 'Test description',
      status: 'todo',
    });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test task');
    expect(response.body.status).toBe('todo');
    expect(response.body.id).toBeDefined();
  });

  test('returns the list of tasks', async () => {
    await request(app).post('/api/tasks').send({
      title: 'First task',
    });

    const response = await request(app).get('/api/tasks');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe('First task');
  });

  test('filters tasks by status', async () => {
    await request(app).post('/api/tasks').send({
      title: 'Task to do',
      status: 'todo',
    });

    await request(app).post('/api/tasks').send({
      title: 'Task in progress',
      status: 'in_progress',
    });

    const response = await request(app).get('/api/tasks?status=todo');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe('Task to do');
  });

  test('updates a task', async () => {
    const created = await request(app).post('/api/tasks').send({
      title: 'Original title',
    });

    const response = await request(app)
      .patch(`/api/tasks/${created.body.id}`)
      .send({ status: 'done' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('done');
    expect(response.body.title).toBe('Original title');
  });

  test('deletes a task', async () => {
    const created = await request(app).post('/api/tasks').send({
      title: 'Task to delete',
    });

    const response = await request(app).delete(`/api/tasks/${created.body.id}`);

    expect(response.status).toBe(204);

    const list = await request(app).get('/api/tasks');

    expect(list.body).toHaveLength(0);
  });

  test('rejects a task without a title', async () => {
    const response = await request(app).post('/api/tasks').send({
      description: 'Missing title',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Task title is required');
  });
});
