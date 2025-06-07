import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ChefHat } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <ChefHat className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-2xl tracking-tight text-primary">Bocado de barrio</h1>
        </Link>
      </div>
      {/* Future elements like user menu can go here */}
    </header>
  );
}
