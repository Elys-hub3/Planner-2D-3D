import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Database connection singleton
let connection: ReturnType<typeof postgres> | undefined;
let db: ReturnType<typeof drizzle> | undefined;

export function getDb() {
  if (!db) {
    const connectionString = process.env.DATABASE_URL;
    
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is required');
    }

    // Create connection with proper settings for Edge Runtime
    connection = postgres(connectionString, {
      prepare: false, // Disable prepared statements for Edge Runtime
      max: 1, // Single connection for Edge Runtime
      idle_timeout: 20,
      connect_timeout: 10,
    });

    db = drizzle(connection, { schema });
  }

  return db;
}

export function closeDb() {
  if (connection) {
    connection.end();
    connection = undefined;
    db = undefined;
  }
}

// Export schema and types
export * from './schema';
export { schema };