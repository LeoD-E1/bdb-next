import createMiddleware from 'next-intl/middleware';

export const i18nConfig = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en',
});
