import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const serverDir = dirname(fileURLToPath(import.meta.url));
const dataDir = join(serverDir, 'data');
const dbPath = join(dataDir, 'techlance.sqlite');

mkdirSync(dataDir, { recursive: true });

const db = new DatabaseSync(dbPath);

db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
  );
`);

const insertUserStatement = db.prepare(`
  INSERT INTO users (id, name, email, password_hash, created_at)
  VALUES (?, ?, ?, ?, ?)
`);

const findUserByEmailStatement = db.prepare(`
  SELECT id, name, email, password_hash AS passwordHash, created_at AS createdAt
  FROM users
  WHERE email = ?
`);

const createSessionStatement = db.prepare(`
  INSERT INTO sessions (token, email, created_at)
  VALUES (?, ?, ?)
`);

const findSessionUserStatement = db.prepare(`
  SELECT u.id, u.name, u.email, u.password_hash AS passwordHash, u.created_at AS createdAt
  FROM sessions s
  INNER JOIN users u ON u.email = s.email
  WHERE s.token = ?
`);

const deleteSessionStatement = db.prepare(`
  DELETE FROM sessions
  WHERE token = ?
`);

export const databaseInfo = {
  type: 'sqlite',
};

export const findUserByEmail = (email) => findUserByEmailStatement.get(email) || null;

export const createUser = (user) => {
  insertUserStatement.run(user.id, user.name, user.email, user.passwordHash, user.createdAt);
  return user;
};

export const createSession = (token, email) => {
  createSessionStatement.run(token, email, new Date().toISOString());
  return token;
};

export const findUserBySessionToken = (token) => findSessionUserStatement.get(token) || null;

export const deleteSession = (token) => {
  deleteSessionStatement.run(token);
};
