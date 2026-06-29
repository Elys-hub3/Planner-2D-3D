import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    console.log('[CHANGE-PASSWORD] Starting password change...');

    // Get the current session
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session?.user) {
      console.log('[CHANGE-PASSWORD] No session found');
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await request.json();
    console.log('📝 [CHANGE-PASSWORD] Request received for user:', session.user.id);

    // Validation
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Le mot de passe actuel et le nouveau mot de passe sont requis' },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Le nouveau mot de passe doit contenir au moins 8 caractères' },
        { status: 400 }
      );
    }

    // Use better-auth's built-in changePassword API
    try {
      await auth.api.changePassword({
        body: {
          newPassword,
          currentPassword,
          revokeOtherSessions: false // Keep other sessions active
        },
        headers: request.headers
      });

      console.log('✅ [CHANGE-PASSWORD] Password changed successfully');

      return NextResponse.json({
        success: true,
        message: 'Mot de passe changé avec succès'
      });
    } catch (changeError: unknown) {
      console.error('[CHANGE-PASSWORD] Change password error:', changeError);

      // Better-auth returns specific error messages
      const errorMessage = changeError instanceof Error ? changeError.message : String(changeError);
      if (errorMessage?.includes('Invalid password') ||
          errorMessage?.includes('incorrect')) {
        return NextResponse.json(
          { error: 'Le mot de passe actuel est incorrect' },
          { status: 401 }
        );
      }

      throw changeError;
    }
  } catch (error: unknown) {
    console.error('[CHANGE-PASSWORD] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur lors du changement de mot de passe';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
