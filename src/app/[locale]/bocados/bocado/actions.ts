import { notFound } from 'next/navigation';

// Retrieve fake company on subdomains.json based on tenant
export const retrieveBocado = async (tenant: string) => {
  // const subdomains = await fetch('/subdomains.json');
  const subdomainsData = await import('@/bocados.json').then((m) => m.default);
  const company = subdomainsData.find((c) => c.tenant === tenant);
  if (!company) {
    return notFound();
  }
  return company;
};
