import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = 
    path === '/auth/login' || 
    path === '/auth/signup' || 
    path === '/';

  // Check if the path should be protected
  const isProtectedPath = 
    path.startsWith('/result') || 
    path.startsWith('/Info') || 
    path.startsWith('/Package');

  // Get the session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // If it's a protected path and there's no token, redirect to login
  if (isProtectedPath && !token) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // If user is already logged in and tries to access login/signup page, redirect to home
  if (isPublicPath && path !== '/' && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If none of the conditions are met, continue with the request
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|image).*)',
  ],
};