import { NextRequest, NextResponse } from 'next/server';

export interface ISubdomainInfo {
  subdomain: string;
  domain: string;
  isAllowedDomain: boolean;
}

export const getSubdomainData = (
  hostname: string,
): ISubdomainInfo | null | Error => {
  if (!hostname) return null;

  const parts = hostname.split('.');

  if (parts.length < 2) return null;

  const subdomain = parts[0];

  // Validation about subdomains must be done in route handlers

  const domain = parts.slice(1).join('.'); // Get the rest of the domain

  const allowedDomains = ['localhost:3000', 'furonto.com'];
  const isAllowedDomain = allowedDomains.some((domain) =>
    hostname.includes(domain),
  );

  // If the domain is not allowed, throw an error
  if (!isAllowedDomain) return new Error('Invalid domain');

  return { subdomain, domain, isAllowedDomain };
};

export default function handleSubdomain(req: NextRequest) {
  console.log('[MIDDLEWARE - SUBDOMAIN] Received request:', req.nextUrl);
  // retrieve locale
  const hostname = req.headers.get('host') || '';
  const subdomainInfo = getSubdomainData(hostname);

  // if subdomain or domain is invalid, redirect to 404 page
  if (subdomainInfo instanceof Error) return NextResponse.error();
  // if there are not response
  if (!subdomainInfo) return;
  const { subdomain, isAllowedDomain } = subdomainInfo;

  // Pass subdomain information through request headers
  // to retrieve on the server component and look for the restaurant

  if (isAllowedDomain) {
    console.log('HERE, allowed domain');
    req.headers.set('x-subdomain', subdomain);
    console.log('🚀 ~ handleSubdomain ~ req.url:', req.headers);
  }

  return null;
}
