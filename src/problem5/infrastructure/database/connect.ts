import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Initialize the database
export const initDb = async () => {
  const db = await open({
    filename: 'stories.db',
    driver: sqlite3.Database
  });

  await db.exec(`
  CREATE TABLE IF NOT EXISTS stories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      publish_at DATETIME,
      url TEXT,
      thumbnail_url TEXT,
      short_description TEXT
  )`);

  return db;
};

