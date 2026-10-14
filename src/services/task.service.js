import * as taskRepository from '../repositories/task.repository.js';

const VALID_STATUSES = ['todo', 'in_progress', 'done'];

export function getTasks(status) {
  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    throw new Error('Invalid task status');
  }

  return taskRepository.findAll(status);
}

export function getTask(id) {
  const task = taskRepository.findById(id);

  if (!task) {
    throw new Error('Task not found');
  }

  return task;
}

export function createTask(data) {
  if (!data || typeof data.title !== 'string' || !data.title.trim()) {
    throw new Error('Task title is required');
  }

  const status = data.status ?? 'todo';

  if (!VALID_STATUSES.includes(status)) {
    throw new Error('Invalid task status');
  }

  return taskRepository.create({
    title: data.title.trim(),
    description: typeof data.description === 'string' ? data.description.trim() : '',
    status,
    deadline: data.deadline ?? null,
  });
}

export function updateTask(id, data) {
  if (!data || Object.keys(data).length === 0) {
    throw new Error('At least one field is required');
  }

  if ('title' in data && (typeof data.title !== 'string' || !data.title.trim())) {
    throw new Error('Task title cannot be empty');
  }

  if ('status' in data && !VALID_STATUSES.includes(data.status)) {
    throw new Error('Invalid task status');
  }

  if ('description' in data && typeof data.description !== 'string') {
    throw new Error('Description must be a string');
  }

  if ('deadline' in data && data.deadline !== null && typeof data.deadline !== 'string') {
    throw new Error('Deadline must be a string or null');
  }

  const task = taskRepository.update(id, {
    ...data,
    ...(typeof data.title === 'string' ? { title: data.title.trim() } : {}),
    ...(typeof data.description === 'string' ? { description: data.description.trim() } : {}),
  });

  if (!task) {
    throw new Error('Task not found');
  }

  return task;
}

export function deleteTask(id) {
  const deleted = taskRepository.remove(id);

  if (!deleted) {
    throw new Error('Task not found');
  }
}
