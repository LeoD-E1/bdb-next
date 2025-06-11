'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { DailySalesData } from '@/app/(app)/summary/actions';
import { formatCurrency } from '@/lib/constants';

interface SalesOverviewChartProps {
  data: DailySalesData[];
}

export function SalesOverviewChart({ data }: SalesOverviewChartProps) {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Resumen de Ventas (Últimos 7 Días)</CardTitle>
        <CardDescription>Ingresos y pedidos diarios.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2 pr-4 md:pr-6">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${formatCurrency(value)}`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)' 
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
              formatter={(value, name) => {
                if (name === 'Ingresos') return formatCurrency(value as number);
                return value;
              }}
            />
            <Legend wrapperStyle={{ fontSize: '0.875rem', paddingTop: '10px' }} />
            <Bar yAxisId="left" dataKey="revenue" name="Ingresos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar yAxisId="right" dataKey="orders" name="Pedidos" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
