import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host')!;
  const path = url.pathname;

  let subdomain = hostname.split('.')[0];
  subdomain = subdomain.replace('localhost:3000', ''); // Local development support

  // Handle main domain or www with base path
  if ((subdomain === 'www' || subdomain === '') && path === '/') {
    return NextResponse.rewrite(new URL('/', req.url));
  }

  // Profile login for the "app" subdomain
  if (subdomain === 'app' && path === '/login') {
    return NextResponse.rewrite(new URL('/login', req.url));
  }

  // Handle subdomains dynamically
  if (subdomain !== 'app' && subdomain !== '') {
    req.nextUrl.pathname = `/users/${subdomain}${path === '/' ? '' : path}`;
  }

  // Apply internationalization middleware
  return intlMiddleware(req);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)'],
};
