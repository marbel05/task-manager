import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

const dataDirectory = path.resolve('data');

fs.mkdirSync(dataDirectory, { recursive: true });

const databasePath =
  process.env.NODE_ENV === 'test' ? ':memory:' : path.join(dataDirectory, 'tasks.db');

export function createDatabase(filename = databasePath) {
  const db = new Database(filename);

  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'todo'
        CHECK (status IN ('todo', 'in_progress', 'done')),
      deadline TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
}

const db = createDatabase();

export default db;
