import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import handleSubdomain from './middleware/subdomain';

const intlMiddleware = (req: NextRequest) => {
  createMiddleware(routing);
  // catch subdomai from headers
  const subdomain = req.headers.get('x-subdomain');
  console.log('🚀 ~ intlMiddleware ~ subdomain:', subdomain);
  if (subdomain) {
    return NextResponse.rewrite(
      new URL(`/${subdomain}${req.nextUrl.pathname}`),
    );
  }
  return NextResponse.next();
};

export default async function middleware(req: NextRequest) {
  return handleSubdomain(req) || intlMiddleware(req) || NextResponse.next();
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)'],
};
