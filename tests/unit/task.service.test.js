import { afterEach, describe, expect, jest, test } from '@jest/globals';

const repository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

jest.unstable_mockModule('../../src/repositories/task.repository.js', () => ({
  ...repository,
}));

const taskService = await import('../../src/services/task.service.js');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Task Service', () => {
  test('returns all tasks', () => {
    const tasks = [{ id: 1, title: 'Test task' }];
    repository.findAll.mockReturnValue(tasks);

    expect(taskService.getTasks()).toEqual(tasks);
    expect(repository.findAll).toHaveBeenCalledWith(undefined);
  });

  test('rejects an invalid status filter', () => {
    expect(() => taskService.getTasks('invalid')).toThrow('Invalid task status');
    expect(repository.findAll).not.toHaveBeenCalled();
  });

  test('returns a task by ID', () => {
    const task = { id: 1, title: 'Test task' };
    repository.findById.mockReturnValue(task);

    expect(taskService.getTask(1)).toEqual(task);
  });

  test('throws when a task does not exist', () => {
    repository.findById.mockReturnValue(undefined);

    expect(() => taskService.getTask(999)).toThrow('Task not found');
  });

  test('creates a task with trimmed title and default values', () => {
    const task = { id: 1, title: 'Test task', status: 'todo' };
    repository.create.mockReturnValue(task);

    expect(taskService.createTask({ title: ' Test task ' })).toEqual(task);
    expect(repository.create).toHaveBeenCalledWith({
      title: 'Test task',
      description: '',
      status: 'todo',
      deadline: null,
    });
  });

  test('rejects an empty title', () => {
    expect(() => taskService.createTask({ title: '   ' })).toThrow('Task title is required');
    expect(repository.create).not.toHaveBeenCalled();
  });

  test('updates a task', () => {
    const task = { id: 1, title: 'Updated task', status: 'done' };
    repository.update.mockReturnValue(task);

    expect(taskService.updateTask(1, { status: 'done' })).toEqual(task);
    expect(repository.update).toHaveBeenCalledWith(1, { status: 'done' });
  });

  test('deletes a task', () => {
    repository.remove.mockReturnValue(true);

    expect(taskService.deleteTask(1)).toBeUndefined();
    expect(repository.remove).toHaveBeenCalledWith(1);
  });
});
