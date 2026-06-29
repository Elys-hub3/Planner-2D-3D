#!/usr/bin/env bun

import { getDb } from '../lib/db';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { users, userPreferences } from '../lib/db/schema';
import { eq } from 'drizzle-orm';

async function setupDatabase() {
  try {
    console.log('🚀 Setting up database...');
    
    const db = getDb();
    
    // Run migrations
    console.log('📦 Running migrations...');
    await migrate(db, { migrationsFolder: './lib/db/migrations' });
    console.log('✅ Migrations completed');
    
    // Create a test user for development
    if (process.env.NODE_ENV === 'development') {
      console.log('👤 Creating development user...');
      
      const testEmail = 'test@idees3d.fr';
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, testEmail))
        .limit(1);
        
      if (existingUser.length === 0) {
        const [newUser] = await db
          .insert(users)
          .values({
            name: 'Test User',
            email: testEmail,
            emailVerified: true,
          })
          .returning();
          
        // Create default preferences
        await db
          .insert(userPreferences)
          .values({
            userId: newUser.id,
            language: 'fr',
            theme: 'light',
            emailNotifications: true,
            marketingEmails: false,
          });
          
        console.log(`✅ Created test user: ${testEmail}`);
      } else {
        console.log(`📋 Test user already exists: ${testEmail}`);
      }
    }
    
    console.log('🎉 Database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

// Check if database URL is provided
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is required');
  process.exit(1);
}

setupDatabase();