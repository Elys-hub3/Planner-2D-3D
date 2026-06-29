import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getDb, users } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    // Get the current session
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const { currentPassword } = await request.json();

    if (!currentPassword) {
      return NextResponse.json(
        { error: 'Le mot de passe actuel est requis' },
        { status: 400 }
      );
    }

    // Get user from database with password
    const db = getDb();
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Better-auth stores password in accounts table, not users table
    // We need to check if the password is correct via better-auth's sign-in
    // For now, we'll use a simple approach - try to sign in with the provided password
    try {
      // Verify password using better-auth's built-in verification
      const signInResult = await auth.api.signInEmail({
        body: {
          email: user.email,
          password: currentPassword,
        },
        headers: request.headers
      });

      if (!signInResult) {
        return NextResponse.json(
          { error: 'Mot de passe incorrect' },
          { status: 401 }
        );
      }

      return NextResponse.json({
        valid: true,
        message: 'Mot de passe vérifié'
      });
    } catch {
      return NextResponse.json(
        { error: 'Mot de passe incorrect' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error verifying password:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification du mot de passe' },
      { status: 500 }
    );
  }
}
