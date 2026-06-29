import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getDb, users, userPreferences } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Get session from Better Auth
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session?.user) {
      return NextResponse.json({
        success: false,
        message: 'Non autorisé',
      }, { status: 401 });
    }

    const db = getDb();

    // Get user preferences
    const userPrefs = await db!
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, session.user.id))
      .limit(1);

    return NextResponse.json({
      success: true,
      data: {
        user: session.user,
        preferences: userPrefs[0] || null,
      }
    });

  } catch (error: unknown) {
    console.error('User API error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Erreur interne du serveur',
      error: (error as Error).message,
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session?.user) {
      return NextResponse.json({
        success: false,
        message: 'Non autorisé',
      }, { status: 401 });
    }

    const body = await request.json();
    const { name, preferences } = body;

    const db = getDb();

    // Update user name if provided
    if (name) {
      await db!
        .update(users)
        .set({ name, updatedAt: new Date() })
        .where(eq(users.id, session.user.id));
    }

    // Update preferences if provided
    if (preferences) {
      await db!
        .insert(userPreferences)
        .values({
          userId: session.user.id,
          ...preferences,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: userPreferences.userId,
          set: {
            ...preferences,
            updatedAt: new Date(),
          },
        });
    }

    return NextResponse.json({
      success: true,
      message: 'Profil mis à jour avec succès',
    });

  } catch (error: unknown) {
    console.error('User update error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la mise à jour',
      error: (error as Error).message,
    }, { status: 500 });
  }
}