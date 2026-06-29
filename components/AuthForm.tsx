'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signUp } from '@/lib/auth/client';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const isLogin = mode === 'login';
  // const title = isLogin ? 'Connexion' : 'Inscription';
  // const subtitle = isLogin 
  //   ? 'Connectez-vous à votre compte' 
  //   : 'Créez votre compte gratuitement';
  const buttonText = isLogin ? 'Se connecter' : "S'inscrire";
  const altText = isLogin 
    ? "Vous n'avez pas de compte ?" 
    : 'Vous avez déjà un compte ?';
  const altLink = isLogin ? '/register' : '/login';
  const altLinkText = isLogin ? "S'inscrire" : 'Se connecter';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (!isLogin && !formData.name) {
      newErrors.name = 'Le nom est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await signIn.email({
          email: formData.email,
          password: formData.password,
        });
        
        if (error) {
          setErrors({ email: error.message || 'Erreur de connexion' });
          return;
        }
        
        // Redirect will be handled by middleware
        window.location.href = '/dashboard';
      } else {
        const { error } = await signUp.email({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        });
        
        if (error) {
          setErrors({ email: error.message || 'Erreur lors de la création du compte' });
          return;
        }
        
        // Redirect to dashboard after successful registration
        window.location.href = '/dashboard';
      }
    } catch (error: unknown) {
      setErrors({ email: (error as Error).message || 'Une erreur est survenue' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 overflow-hidden">
      {/* Back to home button */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          href="/"
          className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden sm:inline">Retour à l&apos;accueil</span>
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
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 lg:w-[35%] flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-6">
            {/* Welcome section */}
            <div className="text-left">
              <Link href="/" className="text-2xl font-bold text-primary mb-8 inline-block lg:hidden">
                idées3D
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Bienvenue sur idées3D
              </h1>
              <p className="text-muted-foreground mb-6">
                Inscrivez vous gratuitement
              </p>
            </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-sm ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  placeholder="Votre nom complet"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-sm ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
                placeholder="votre@email.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-sm ${
                  errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-ring border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Se souvenir de moi
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Mot de passe oublié ?
                </Link>
              </div>
            )}

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
                  Chargement...
                </>
              ) : (
                buttonText
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {altText}{' '}
                <Link href={altLink} className="font-medium text-primary hover:text-primary/80 transition-colors">
                  {altLinkText}
                </Link>
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-muted-foreground">ou</span>
              </div>
            </div>

            <Link
              href="/planner"
              className="w-full btn-secondary text-center block"
            >
              Continuer sans compte
            </Link>
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