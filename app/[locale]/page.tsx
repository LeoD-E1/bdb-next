import { setRequestLocale } from 'next-intl/server';
import { LandingPage } from './landing/Landing';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <LandingPage />;
}
