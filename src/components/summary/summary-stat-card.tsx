'use client';

import type { FunctionComponent, SVGProps } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SummaryStatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon
  description?: string;
  className?: string;
}

export function SummaryStatCard({ title, value, icon: Icon, description, className }: SummaryStatCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {/* <Icon className="h-5 w-5 text-muted-foreground" /> */}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primary">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground pt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
