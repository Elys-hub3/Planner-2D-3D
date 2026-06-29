import { signOut } from '@/lib/auth/client';

/**
 * Handle API responses and automatically log out on 401 (session expired)
 *
 * @param response - The fetch Response object
 * @param redirectOnLogout - Whether to redirect after logout (default: true)
 * @returns The response data or throws an error
 */
export async function handleApiResponse<T = unknown>(
  response: Response,
  redirectOnLogout: boolean = true
): Promise<T> {
  // If 401 Unauthorized, the session has expired
  if (response.status === 401) {
    console.warn('🔒 Session expirée, déconnexion automatique...');

    try {
      await signOut();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }

    // Redirect to login page
    if (redirectOnLogout) {
      window.location.href = '/login?expired=true';
    }

    throw new Error('Session expirée');
  }

  // Parse JSON response
  const data = await response.json();

  // If response is not OK, throw with error message
  if (!response.ok) {
    throw new Error(data.error || `Erreur HTTP: ${response.status}`);
  }

  return data;
}

/**
 * Wrapper around fetch that automatically handles 401 errors
 *
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @returns The parsed response data
 */
export async function fetchWithAuth<T = unknown>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);
  return handleApiResponse<T>(response);
}
