import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getDb, users } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function PUT(request: NextRequest) {
  try {
    console.log('🔄 [UPDATE-PROFILE] Starting profile update...');

    // Get the current session
    const session = await auth.api.getSession({
      headers: request.headers
    });

    console.log('👤 [UPDATE-PROFILE] Session user:', session?.user?.id);

    if (!session?.user) {
      console.log('❌ [UPDATE-PROFILE] No session found');
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const { name } = await request.json();
    console.log('📝 [UPDATE-PROFILE] Data received:', { name });

    // Validation
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Le nom est requis' },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Le nom est trop long (maximum 100 caractères)' },
        { status: 400 }
      );
    }

    const db = getDb();

    // Update user in database (only name, email is immutable)
    console.log('💾 [UPDATE-PROFILE] Updating database for user:', session.user.id);
    const [updatedUser] = await db
      .update(users)
      .set({
        name: name.trim(),
        updatedAt: new Date()
      })
      .where(eq(users.id, session.user.id))
      .returning();

    if (!updatedUser) {
      console.log('❌ [UPDATE-PROFILE] No user returned from update');
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour du profil' },
        { status: 500 }
      );
    }

    console.log('✅ [UPDATE-PROFILE] Successfully updated:', {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        emailVerified: updatedUser.emailVerified,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt
      }
    });
  } catch (error) {
    console.error('❌ [UPDATE-PROFILE] Error updating profile:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du profil' },
      { status: 500 }
    );
  }
}
