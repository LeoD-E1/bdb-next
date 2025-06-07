'use client';

import type { Order, OrderStatus } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatCurrency, formatDate, getOrderStatusIcon, getOrderStatusColor } from '@/lib/constants';
import { UtensilsCrossed, Ban, Check, PackageCheck } from 'lucide-react';
import PizzaIcon from '@/components/icons/pizza-icon';
import { cn } from '@/lib/utils';

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

export function OrderCard({ order, onUpdateStatus }: OrderCardProps) {
  const StatusIcon = getOrderStatusIcon(order.status);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-headline text-2xl text-primary">Pedido #{order.id.substring(0, 6)}</CardTitle>
            <CardDescription>{order.customerName} - {order.customerPhone}</CardDescription>
          </div>
          <Badge variant={order.status === 'completed' ? 'default' : order.status === 'rejected' ? 'destructive' : 'secondary'} className={cn("text-sm", getOrderStatusColor(order.status))}>
            <StatusIcon className="mr-2 h-4 w-4" />
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Recibido: {formatDate(order.createdAt)}
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="font-semibold mb-2">Artículos:</h4>
        <ul className="space-y-1 text-sm">
          {order.items.map((item) => (
            <li key={item.productId} className="flex justify-between">
              <span>{item.name} (x{item.quantity})</span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <Separator className="my-3" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>{formatCurrency(order.totalAmount)}</span>
        </div>
      </CardContent>
      {order.status !== 'completed' && order.status !== 'rejected' && (
        <CardFooter className="flex justify-end space-x-2">
          {order.status === 'pending' && (
            <>
              <Button variant="outline" size="sm" onClick={() => onUpdateStatus(order.id, 'rejected')}>
                <Ban className="mr-2 h-4 w-4" /> Rechazar
              </Button>
              <Button size="sm" onClick={() => onUpdateStatus(order.id, 'accepted')} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <UtensilsCrossed className="mr-2 h-4 w-4" /> Aceptar
              </Button>
            </>
          )}
          {order.status === 'accepted' && (
            <Button size="sm" onClick={() => onUpdateStatus(order.id, 'completed')} className="bg-green-600 hover:bg-green-700 text-white">
              <PizzaIcon className="mr-2 h-4 w-4" /> Completar
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
