'use client';

import type { Order, OrderStatus } from '@/lib/types';
import { OrderCard } from './order-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useMemo, useEffect }  from 'react';
import { ORDER_STATUS_OPTIONS, MOCK_ORDERS } from '@/lib/constants';
import { updateOrderStatus } from '@/app/(app)/dashboard/actions'; // Server action
import { useToast } from "@/hooks/use-toast";

interface OrderListProps {
  initialOrders: Order[];
}

export function OrderList({ initialOrders }: OrderListProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [activeTab, setActiveTab] = useState<OrderStatus>('pending');
  const { toast } = useToast();

  // Effect to handle potential updates to initialOrders if the parent component re-fetches
  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);


  const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
    // Optimistic update
    const previousOrders = orders;
    setOrders(prevOrders =>
      prevOrders.map(o => (o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o))
    );

    try {
      const updatedOrder = await updateOrderStatus(orderId, status);
      if (updatedOrder) {
        setOrders(prevOrders =>
          prevOrders.map(o => (o.id === updatedOrder.id ? updatedOrder : o))
        );
        toast({
            title: "Estado Actualizado",
            description: `El pedido #${orderId.substring(0,6)} ha sido marcado como ${status}.`,
        });
      } else {
        throw new Error("Failed to update order on server");
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
      setOrders(previousOrders); // Revert optimistic update
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del pedido.",
        variant: "destructive",
      });
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => order.status === activeTab).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [orders, activeTab]);

  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as OrderStatus)} className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
        {ORDER_STATUS_OPTIONS.map(status => (
          <TabsTrigger key={status} value={status} className="capitalize font-headline">
            {status.charAt(0).toUpperCase() + status.slice(1)} ({orders.filter(o => o.status === status).length})
          </TabsTrigger>
        ))}
      </TabsList>
      
      {ORDER_STATUS_OPTIONS.map(status => (
         <TabsContent key={status} value={status}>
          {filteredOrders.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredOrders.map(order => (
                <OrderCard key={order.id} order={order} onUpdateStatus={handleUpdateStatus} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl text-muted-foreground">No hay pedidos en estado "{status}".</p>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
