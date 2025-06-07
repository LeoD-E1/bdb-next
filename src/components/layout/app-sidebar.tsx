'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ChefHat } from 'lucide-react';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left" className="border-r">
      <SidebarHeader className="border-b">
        <Link href="/dashboard" className="flex items-center gap-2 p-2">
           <ChefHat className="h-8 w-8 text-primary group-data-[collapsible=icon]:mx-auto" />
           <span className="font-headline text-xl text-primary group-data-[collapsible=icon]:hidden">Bocado de Barrio</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {NAV_ITEMS.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={item.isActive ? item.isActive(pathname) : pathname === item.href}
                tooltip={{ children: item.label, side: 'right', align: 'center' }}
                className={cn(
                  "py-3", // Increased vertical padding for more "span"
                  (item.isActive ? item.isActive(pathname) : pathname === item.href) ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-2 group-data-[collapsible=icon]:hidden">
        <p className="text-xs text-sidebar-foreground/70">© {new Date().getFullYear()}</p>
      </SidebarFooter>
    </Sidebar>
  );
}
