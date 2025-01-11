import BaseLayout from '@/src/ui/components/BaseLayout';
import NotFoundPage from '@/src/ui/components/NotFoundPage';
import { routing } from '@/src/i18n/routing';

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <NotFoundPage />
    </BaseLayout>
  );
}
