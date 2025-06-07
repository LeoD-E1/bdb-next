'use server';

import type { Order, OrderStatus } from '@/lib/types';
import { MOCK_ORDERS } from '@/lib/constants';

// Simulate a database or state store
let ordersStore: Order[] = [...MOCK_ORDERS];

export async function getOrders(): Promise<Order[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return ordersStore.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order | null> {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
  
  const orderIndex = ordersStore.findIndex(o => o.id === orderId);
  if (orderIndex === -1) {
    console.error(`Order with ID ${orderId} not found.`);
    return null;
  }

  const updatedOrder = {
    ...ordersStore[orderIndex],
    status,
    updatedAt: new Date().toISOString(),
  };
  ordersStore[orderIndex] = updatedOrder;
  
  return updatedOrder;
}
