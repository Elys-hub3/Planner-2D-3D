'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('L\'email est requis');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email invalide');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setIsSubmitted(true);
    } catch (error: unknown) {
      setError((error as Error).message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 overflow-hidden">
        {/* Back to login button */}
        <div className="absolute top-6 left-6 z-20">
          <Link 
            href="/login"
            className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Retour à la connexion</span>
          </Link>
        </div>
        
        <div className="flex h-screen">
          {/* Left side - Illustration */}
          <div className="hidden lg:flex lg:w-[60%] bg-gradient-to-br from-primary to-yellow-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="relative z-10 flex items-center justify-center p-12">
              <Image 
                src="/login-illustration.svg" 
                alt="Illustration de conception de plans"
                width={800}
                height={600}
                className="w-full max-w-2xl mx-auto"
              />
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
          </div>

          {/* Right side - Success message */}
          <div className="flex-1 lg:w-[35%] flex items-center justify-center p-8">
            <div className="w-full max-w-md text-center space-y-6">
              <div className="text-left">
                <Link href="/" className="text-2xl font-bold text-primary mb-8 inline-block lg:hidden">
                  idées3D
                </Link>
              </div>

              {/* Success icon */}
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h1 className="text-2xl font-bold text-gray-900">
                Email envoyé !
              </h1>
              
              <p className="text-muted-foreground">
                Nous avons envoyé un code de vérification à <strong>{email}</strong>
              </p>
              
              <p className="text-sm text-muted-foreground">
                Vérifiez votre boîte de réception et suivez les instructions pour réinitialiser votre mot de passe.
              </p>

              <div className="space-y-4">
                <Link
                  href={`/reset-password?email=${encodeURIComponent(email)}`}
                  className="w-full btn-primary text-center block"
                >
                  Saisir le code de vérification
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail('');
                  }}
                  className="w-full btn-secondary"
                >
                  Renvoyer le code
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Vous vous souvenez de votre mot de passe ?{' '}
                  <Link href="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
                    Se connecter
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 overflow-hidden">
      {/* Back to login button */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          href="/login"
          className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden sm:inline">Retour à la connexion</span>
        </Link>
      </div>
      
      <div className="flex h-screen">
        {/* Left side - Illustration */}
        <div className="hidden lg:flex lg:w-[60%] bg-gradient-to-br from-primary to-yellow-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="relative z-10 flex items-center justify-center p-12">
            <Image 
              src="/login-illustration.svg" 
              alt="Illustration de conception de plans"
              width={800}
              height={600}
              className="w-full max-w-2xl mx-auto"
            />
          </div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 lg:w-[35%] flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-6">
            <div className="text-left">
              <Link href="/" className="text-2xl font-bold text-primary mb-8 inline-block lg:hidden">
                idées3D
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Mot de passe oublié ?
              </h1>
              <p className="text-muted-foreground mb-6">
                Saisissez votre email pour recevoir un code de réinitialisation
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className={`w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-sm ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  placeholder="votre@email.com"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary relative flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  'Envoyer le code'
                )}
              </button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Vous vous souvenez de votre mot de passe ?{' '}
                  <Link href="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
                    Se connecter
                  </Link>
                </p>
              </div>
            </form>

            {/* Mobile illustration */}
            <div className="lg:hidden mt-6 text-center">
              <Image 
                src="/login-illustration.svg" 
                alt="Illustration de conception de plans"
                width={128}
                height={96}
                className="w-32 mx-auto opacity-30"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}