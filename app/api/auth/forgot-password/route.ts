import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'L\'email est requis' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Create a new request for the Better Auth forget password endpoint
    const otpRequest = new Request(new URL('/api/auth/forget-password/email-otp', request.url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    // Use Better Auth handler directly (same as registration)
    const response = await auth.handler(otpRequest);

    let data;
    try {
      const text = await response.text();
      data = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      data = { message: 'Invalid response format' };
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Erreur lors de l\'envoi du code' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Code de vérification envoyé avec succès'
    });

  } catch (error) {
    console.error('Erreur API forgot-password:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}