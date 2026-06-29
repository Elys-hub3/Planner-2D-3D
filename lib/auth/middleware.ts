import { auth } from "./index";
import { NextRequest, NextResponse } from "next/server";

export async function authMiddleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers
  });

  return {
    session,
    user: session?.user || null,
    isAuthenticated: !!session?.user
  };
}

export function requireAuth() {
  return async (request: NextRequest) => {
    const { session } = await authMiddleware(request);

    if (!session?.user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  };
}

export function redirectIfAuthenticated() {
  return async (request: NextRequest) => {
    const { session } = await authMiddleware(request);

    if (session?.user) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  };
}