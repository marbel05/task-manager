import request from 'supertest';
import { describe, expect, test } from '@jest/globals';
import app from '../../src/app.js';

describe('GET /health', () => {
  test('returns 200 and application status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      application: 'Task Manager',
    });
  });
});
