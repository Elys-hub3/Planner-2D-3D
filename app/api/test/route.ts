import { NextResponse } from 'next/server';
import { getDb, users } from '@/lib/db';
import { count } from 'drizzle-orm';

export async function GET() {
  try {
    const db = getDb();

    // Test database connection
    const [userCount] = await db!.select({ count: count() }).from(users);
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: {
        userCount: userCount.count,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
      }
    });
  } catch (error: unknown) {
    console.error('Database test error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: (error as Error).message,
    }, { status: 500 });
  }
}