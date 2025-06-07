import { OrderList } from '@/components/orders/order-list';
import { MOCK_ORDERS } from '@/lib/constants'; // Will be replaced by server actions

export default async function DashboardPage() {
  // In a real app, orders would be fetched via a server action or API call
  const orders = MOCK_ORDERS;

  return (
    <div className="container mx-auto py-8">
      <h1 className="font-headline text-4xl mb-8 text-primary">Gestión de Pedidos</h1>
      <OrderList initialOrders={orders} />
    </div>
  );
}
