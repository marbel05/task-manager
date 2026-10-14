import db from '../config/database.js';

export function findAll(status) {
  if (status) {
    return db.prepare('SELECT * FROM tasks WHERE status = ? ORDER BY id DESC').all(status);
  }

  return db.prepare('SELECT * FROM tasks ORDER BY id DESC').all();
}

export function findById(id) {
  return db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
}

export function create({ title, description = '', status = 'todo', deadline = null }) {
  const result = db
    .prepare(
      `
      INSERT INTO tasks (title, description, status, deadline)
      VALUES (?, ?, ?, ?)
    `,
    )
    .run(title, description, status, deadline);

  return findById(Number(result.lastInsertRowid));
}

export function update(id, fields) {
  const current = findById(id);

  if (!current) {
    return null;
  }

  const updated = {
    title: fields.title ?? current.title,
    description: fields.description ?? current.description,
    status: fields.status ?? current.status,
    deadline: fields.deadline === undefined ? current.deadline : fields.deadline,
  };

  db.prepare(
    `
    UPDATE tasks
    SET title = ?, description = ?, status = ?, deadline = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `,
  ).run(updated.title, updated.description, updated.status, updated.deadline, id);

  return findById(id);
}

export function remove(id) {
  return db.prepare('DELETE FROM tasks WHERE id = ?').run(id).changes > 0;
}
