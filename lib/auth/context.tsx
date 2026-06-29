'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { authClient } from './client';

type User = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
};

type Session = {
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    ipAddress?: string;
    userAgent?: string;
  };
  user: User;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  isAuthenticated: false,
  refreshSession: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to refresh session data
  const refreshSession = async () => {
    try {
      console.log('🔄 Refreshing session data (bypassing cache)...');
      // Force fetch from database by disabling cookie cache
      const { data } = await authClient.getSession({
        fetchOptions: {
          query: {
            disableCookieCache: 'true'
          }
        }
      });
      setSession(data as Session | null);
      console.log('✅ Session refreshed from DB:', data?.user);
    } catch (error) {
      console.error('❌ Error refreshing session:', error);
      setSession(null);
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Get initial session
    async function getInitialSession() {
      try {
        const { data } = await authClient.getSession();
        if (isMounted) {
          setSession(data as Session | null);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    getInitialSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const value: AuthContextType = {
    session,
    user: session?.user || null,
    isLoading,
    isAuthenticated: !!session?.user,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useUser() {
  const { user, isLoading } = useAuth();
  return { user, isLoading };
}

export function useSession() {
  const { session, isLoading } = useAuth();
  return { session, isLoading };
}