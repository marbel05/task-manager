import * as taskService from '../services/task.service.js';

function parseTaskId(value) {
  const id = Number(value);

  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error('Invalid task ID');
  }

  return id;
}

function handleError(res, error) {
  const status = error.message === 'Task not found' ? 404 : 400;

  res.status(status).json({
    error: error.message,
  });
}

export function getTasks(req, res) {
  try {
    const tasks = taskService.getTasks(req.query.status);
    res.status(200).json(tasks);
  } catch (error) {
    handleError(res, error);
  }
}

export function getTask(req, res) {
  try {
    const task = taskService.getTask(parseTaskId(req.params.id));
    res.status(200).json(task);
  } catch (error) {
    handleError(res, error);
  }
}

export function createTask(req, res) {
  try {
    const task = taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    handleError(res, error);
  }
}

export function updateTask(req, res) {
  try {
    const task = taskService.updateTask(parseTaskId(req.params.id), req.body);
    res.status(200).json(task);
  } catch (error) {
    handleError(res, error);
  }
}

export function deleteTask(req, res) {
  try {
    taskService.deleteTask(parseTaskId(req.params.id));
    res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
}
