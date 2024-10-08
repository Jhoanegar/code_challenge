import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { promises as fs } from 'fs';

const getDatabase = async (dbFilePath: string): Promise<Database<sqlite3.Database, sqlite3.Statement>> => {
	const dbExists = await fs.access(dbFilePath).then(() => true).catch(() => false);

	const db = await open({
		filename: dbFilePath,
		driver: sqlite3.Database
	});

	if (!dbExists) {
		await db.exec(`
			CREATE TABLE IF NOT EXISTS users (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT NOT NULL,
				email TEXT NOT NULL
			);
		`);
		console.log('Database and table created.');
	} else {
		console.log('Database already exists.');
	}

	return db;
}

export default getDatabase;


/** Example usage:
const db = await getDatabase('some.db');
await db.run('INSERT INTO users (name, email) VALUES (?, ?)', ['Alice', 'test'])
await db.get('SELECT * FROM users'));

 */
