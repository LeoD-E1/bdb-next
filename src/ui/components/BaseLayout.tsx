import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Head from 'next/head';
import { ReactNode } from 'react';
import { poppins } from '../font';

type Props = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <Head>
        <script src='https://unpkg.com/react-scan/dist/auto.global.js' async />
      </Head>
      <body className={`${poppins.className}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
